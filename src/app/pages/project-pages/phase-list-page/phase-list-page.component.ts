import { Component } from '@angular/core';
import { ProjectTitleCardComponent } from '../../../components/project-pages/phase-list-page/project-title-card/project-title-card.component';
import { PhaseDropdownComponent } from '../../../components/project-pages/phase-list-page/phase-dropdown/phase-dropdown.component';
import { MatIconModule } from '@angular/material/icon';
import { PhaseCreateComponent } from '../../../components/project-pages/phase-list-page/phase-create/phase-create.component';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ProjectSideNavComponent } from '../../../layouts/project-side-nav/project-side-nav.component';
import { ProjectFullInfo } from '../../../../shared/models/project/project-full-info.model';
import { PhaseListItem } from '../../../../shared/models/project/phase-list-item.model';
import { ActivatedRoute } from '@angular/router';
import { PhaseCreateModel } from '../../../../shared/models/project/phase-create.model';
import { ProjectService } from '../../../services/project.service';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PhaseMoveModel } from '../../../../shared/models/project/phase-move.model';

@Component({
  selector: 'app-phase-list-page',
  standalone: true,
  imports: [
    ProjectSideNavComponent,
    ProjectTitleCardComponent,
    PhaseDropdownComponent,
    PhaseCreateComponent,
    MatIconModule,
    DragDropModule,
    CommonModule
  ],
  templateUrl: './phase-list-page.component.html',
  styleUrl: './phase-list-page.component.css'
})
export class PhaseListPageComponent {
  project: ProjectFullInfo = {
    id: "",
    projectName: "",
    teamId: "",
    leader: {
      id: "",
      fullName: "",
      email: "",
      profilePicture: "",
    },
    phases: []
  };
  private currMaxPos: number = 0;
  private offset = 1 << 16 // 2^16 or 65536
  private lowerBoundPos = 1 << 4 // 2^4 or 16
  private upperBoundPos = 1 << 30 // 2^30 or 1,073,741,824

  constructor(
    private activeRoute: ActivatedRoute,
    private projectService: ProjectService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.activeRoute.data.subscribe(data => {
      this.project = data['project'];
      if (this.project.phases.length > 0) {
        this.currMaxPos = this.project.phases[this.project.phases.length - 1].position;
      }
    });
  }

  drop(event: CdkDragDrop<PhaseListItem[]>) {
    if (event.previousIndex === event.currentIndex) {
      // no changes
      return;
    }

    const phaseList = event.container.data;
    const prev = event.previousIndex;
    const phase = phaseList[prev];
    if (phase.id && phase.id.length === 0) {
      // if id is null or empty, possibly because an add request was recently made and server hasn't returned the id,
      // then do nothing
      this.snackBar.open("Đã xảy ra lỗi! Hãy thử lại sau.", "Close", { duration: 3000 });
      return;
    }

    const curr = event.currentIndex;
    moveItemInArray(phaseList, prev, curr);

    var position: number;
    var needsReposition: boolean;
    const lastIndex = phaseList.length - 1;
    if (curr === 0) {
      // case first item, get position of previous first item divided by 2
      position = phaseList[1].position >> 1; // rightshift 1 bit is equivalent to div 2
      // if position of item is too close to the start, update flag
      needsReposition = position < this.lowerBoundPos;
    } else if (curr === lastIndex) {
      // case last item, get position of previous last item plus offset
      position = phaseList[lastIndex - 1].position + this.offset;
      // if position of item is too far from the start, update flag
      needsReposition = position > this.upperBoundPos;
    } else {
      // case between 2 items, get middle position
      position = (phaseList[curr - 1].position + phaseList[curr + 1].position) >> 1;
      // if position of item is too close to adjacent items, update flag
      needsReposition = (position - phaseList[curr - 1].position < this.lowerBoundPos);
    }
    phase.position = position;
    if (needsReposition) {
      this.redistributePhases();
    }

    const movement: PhaseMoveModel = {
      id: phase.id,
      position: position,
      needsReposition: needsReposition
    }
    this.projectService
      .movePhase(movement)
      .pipe(
        catchError(error => {
          this.snackBar.open("Đã xảy ra lỗi! Những thay đổi của bạn có thể sẽ không được lưu. Hãy tải lại trang.", "Close", { duration: 3000 });
          return throwError(() => new Error(error.error));
        })
      )
      .subscribe();
  }

  redistributePhases() {
    var newPos = 0;
    for (var phase of this.project.phases) {
      newPos += this.offset;
      phase.position = newPos;
    }
    this.currMaxPos = newPos;
  }

  createPhase(phase: PhaseCreateModel) {
    phase.position = this.currMaxPos + this.offset;
    phase.projectId = this.project.id;
    this.currMaxPos = phase.position;
    var newItem = {
      id: "",
      phaseName: phase.phaseName,
      position: phase.position,
      majorTasks: []
    };
    this.project.phases.push(newItem);
    this.projectService
      .createPhase(phase)
      .pipe(
        catchError(error => {
          this.snackBar.open("Đã xảy ra lỗi! Hãy thử lại sau.", "Close", { duration: 3000 });
          var index = this.project.phases.indexOf(newItem);
          if (index !== -1) {
            this.project.phases.splice(index, 1);
          }
          return throwError(() => new Error(error.error));
        })
      )
      .subscribe(response => newItem.id = response.id);
      // TODO IMPORTANT check id empty before edit & move position
  }
}
