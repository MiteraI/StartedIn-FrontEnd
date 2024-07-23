import { Component } from '@angular/core';
import { TaskboardComponent } from '../../../components/project-pages/phase-detail-page/taskboard/taskboard.component';
import { MatIconModule } from '@angular/material/icon';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ProjectSideNavComponent } from '../../../layouts/project-side-nav/project-side-nav.component';
import { TaskboardCreateComponent } from '../../../components/project-pages/phase-detail-page/taskboard-create/taskboard-create.component';
import { PhaseFullInfo } from '../../../../shared/models/project/phase-full-info.model';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskboardMoveModel } from '../../../../shared/models/task/taskboard-move.model';
import { catchError, throwError } from 'rxjs';
import { TaskboardCreateModel } from '../../../../shared/models/task/taskboard-create.model';
import { TaskBoardService } from '../../../services/task-board.service';

@Component({
  selector: 'app-phase-detail-page',
  standalone: true,
  imports: [
    ProjectSideNavComponent,
    TaskboardComponent,
    TaskboardCreateComponent,
    MatIconModule,
    DragDropModule,
    CommonModule
  ],
  templateUrl: './phase-detail-page.component.html',
  styleUrl: './phase-detail-page.component.css'
})
export class PhaseDetailPageComponent {
  phase: PhaseFullInfo = {
    id: "",
    phaseName: "",
    projectId: "",
    taskboards: []
  };
  private currMaxPos: number = 0;
  private offset: number = 1 << 16;
  private lowerBoundPos = 1 << 4 // 2^4 or 16
  private upperBoundPos = 1 << 30 // 2^30 or 1,073,741,824

  constructor(
    private activeRoute: ActivatedRoute,
    private taskboardService: TaskBoardService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.activeRoute.data.subscribe(data => {
      this.phase = data['phase'];
      if (this.phase.taskboards.length > 0) {
        this.currMaxPos = this.phase.taskboards[this.phase.taskboards.length - 1].position;
      }
    });
  }

  drop(event: CdkDragDrop<PhaseFullInfo>) {
    if (event.previousIndex === event.currentIndex) {
      // no changes
      return;
    }

    const taskboardList = event.container.data.taskboards;
    const prev = event.previousIndex;
    const taskboard = taskboardList[prev];
    if (taskboard.id && taskboard.id.length === 0) {
      // if id is null or empty, possibly because an add request was recently made and server hasn't returned the id,
      // then do nothing
      this.snackBar.open("Đã xảy ra lỗi! Hãy thử lại sau.", "Close", { duration: 3000 });
      return;
    }

    const curr = event.currentIndex;
    moveItemInArray(taskboardList, prev, curr);

    var position: number;
    var needsReposition: boolean;
    const lastIndex = taskboardList.length - 1;
    if (curr === 0) {
      // case first item, get position of previous first item divided by 2
      position = taskboardList[1].position >> 1; // rightshift 1 bit is equivalent to div 2
      // if position of item is too close to the start, update flag
      needsReposition = position < this.lowerBoundPos;
    } else if (curr === lastIndex) {
      // case last item, get position of previous last item plus offset
      position = taskboardList[lastIndex - 1].position + this.offset;
      // if position of item is too far from the start, update flag
      needsReposition = position > this.upperBoundPos;
    } else {
      // case between 2 items, get middle position
      position = (taskboardList[curr - 1].position + taskboardList[curr + 1].position) >> 1;
      // if position of item is too close to adjacent items, update flag
      needsReposition = (position - taskboardList[curr - 1].position < this.lowerBoundPos);
    }
    taskboard.position = position;
    if (needsReposition) {
      this.redistributeTaskboards();
    }

    const movement: TaskboardMoveModel = {
      id: taskboard.id,
      position: position,
      needsReposition: needsReposition
    }
    this.taskboardService
      .moveTaskboard(movement)
      .pipe(
        catchError(error => {
          this.snackBar.open("Đã xảy ra lỗi! Những thay đổi của bạn có thể sẽ không được lưu. Hãy tải lại trang.", "Close", { duration: 3000 });
          return throwError(() => new Error(error.error));
        })
      )
      .subscribe();
  }

  redistributeTaskboards() {
    var newPos = 0;
    for (var taskboard of this.phase.taskboards) {
      newPos += this.offset;
      taskboard.position = newPos;
    }
    this.currMaxPos = newPos;
  }

  createTaskboard(taskboard: TaskboardCreateModel) {
    taskboard.position = this.currMaxPos + this.offset;
    taskboard.phaseId = this.phase.id;
    this.currMaxPos = taskboard.position;
    var newItem = {
      id: "",
      position: taskboard.position,
      title: taskboard.title,
      phaseId: taskboard.phaseId,
      minorTasks: []
    };
    this.phase.taskboards.push(newItem);
    this.taskboardService
      .createTaskboard(taskboard)
      .pipe(
        catchError(error => {
          this.snackBar.open("Đã xảy ra lỗi! Hãy thử lại sau.", "Close", { duration: 3000 });
          var index = this.phase.taskboards.indexOf(newItem);
          if (index !== -1) {
            this.phase.taskboards.splice(index, 1);
          }
          return throwError(() => new Error(error.error));
        })
      )
      .subscribe(response => newItem.id = response.id);
      // TODO IMPORTANT check id empty before edit & move position
  }
}
