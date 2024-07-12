import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PhaseListItem } from '../../../../../shared/models/project/phase-list-item.model';
import { MajorTaskBasicInfo } from '../../../../../shared/models/task/major-task-basic-info.model';
import { MajorTaskCardComponent } from '../major-task-card/major-task-card.component';
import { MajorTaskCreateComponent } from '../major-task-create/major-task-create.component';
import { MajorTaskCreateModel } from '../../../../../shared/models/task/major-task-create.model';
import { TaskService } from '../../../../services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'phase-dropdown',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    RouterModule,
    DragDropModule,
    MatProgressBarModule,
    MajorTaskCardComponent,
    MajorTaskCreateComponent
  ],
  templateUrl: './phase-dropdown.component.html',
  styleUrl: './phase-dropdown.component.css'
})
export class PhaseDropdownComponent {
  @Input({required: true}) phase: PhaseListItem = {
    id: "",
    phaseName: "",
    position: 0,
    majorTasks: []
  };
  expanded: boolean = true;
  currMaxPos: number = 0;

  constructor(
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if (this.phase.majorTasks.length > 0) {
      this.currMaxPos = this.phase.majorTasks[this.phase.majorTasks.length - 1].position;
    }
  }

  toggleExpand() {
    this.expanded = !this.expanded;
  }

  showEditPopup(event: Event) {
    event.stopPropagation();
  }

  showDeletePopup(event: Event) {
    event.stopPropagation();
  }

  submitTask(task: MajorTaskCreateModel) {
    console.log(task);
    this.currMaxPos = task.position;
    var newItem = {
      id: "",
      taskTitle: task.taskTitle,
      description: task.description,
      position: task.position
    };
    this.phase.majorTasks.push(newItem);
    this.taskService
      .createMajorTask(task)
      .pipe(
        catchError(error => {
          this.snackBar.open("Đã xảy ra lỗi! Hãy thử lại sau.", "Close", { duration: 3000 });
          var index = this.phase.majorTasks.indexOf(newItem);
          if (index !== -1) {
            this.phase.majorTasks.splice(index, 1);
          }
          return throwError(() => new Error(error.error));
        })
      )
      .subscribe(response => newItem.id = response.id);
      // TODO IMPORTANT check id empty before edit & move position
  }

  drop(event: CdkDragDrop<MajorTaskBasicInfo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
