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
  currMaxPos: number = 0;

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
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  createPhase(phase: PhaseCreateModel) {
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
