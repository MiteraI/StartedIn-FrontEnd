import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PhaseListItem } from '../../../../../shared/models/project/phase-list-item.model';
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
    MajorTaskCreateComponent,
  ],
  templateUrl: './phase-dropdown.component.html',
  styleUrl: './phase-dropdown.component.css',
})
export class PhaseDropdownComponent {
  @Input({ required: true }) phase: PhaseListItem = {
    id: '',
    phaseName: '',
    position: 0,
    majorTasks: [],
  };
  expanded: boolean = true;
  currMaxPos: number = 0;
  private offset = 1 << 16; // 2^16 or 65536

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
      id: '',
      taskTitle: task.taskTitle,
      description: task.description,
      position: task.position,
    };
    this.phase.majorTasks.push(newItem);
    this.taskService
      .createMajorTask(task)
      .pipe(
        catchError(error => {
          this.snackBar.open('Đã xảy ra lỗi! Hãy thử lại sau.', 'Close', { duration: 3000 });
          var index = this.phase.majorTasks.indexOf(newItem);
          if (index !== -1) {
            this.phase.majorTasks.splice(index, 1);
          }
          return throwError(() => new Error(error.error));
        })
      )
      .subscribe(response => (newItem.id = response.id));
    // TODO IMPORTANT check id empty before edit & move position
  }

  drop(event: CdkDragDrop<PhaseListItem>) {
    if (event.previousContainer === event.container) {
      this.moveItem(event);
    } else {
      this.transferItem(event);
    }
  }

  moveItem(event: CdkDragDrop<PhaseListItem>) {
    const taskList = event.container.data.majorTasks;
    const prev = event.previousIndex;
    const task = taskList[prev];
    if (task.id && task.id.length === 0) {
      this.snackBar.open('Đã xảy ra lỗi! Hãy thử lại sau.', 'Close', { duration: 3000 });
      return;
    }

    const curr = event.currentIndex;
    moveItemInArray(taskList, prev, curr);

    var position: number;
    const lastIndex = taskList.length - 1;
    if (curr === 0) {
      // case first item, get position of previous first item divided by 2
      position = taskList[1].position >> 1; // rightshift 1 bit is equivalent to div 2
    } else if (curr === lastIndex) {
      // case last item, get position of previous last item plus offset
      position = taskList[lastIndex - 1].position + this.offset;
    } else {
      // case between 2 items, get middle position
      position = (taskList[curr - 1].position + taskList[curr + 1].position) >> 1;
    }
    console.log(task.id);
    console.log(position);
    console.log(this.phase.id);
    // TODO check pos < 2^4 and > 2^31
  }

  transferItem(event: CdkDragDrop<PhaseListItem>) {
    const taskList = event.previousContainer.data.majorTasks;
    const prev = event.previousIndex;
    const task = taskList[prev];
    if (task.id && task.id.length === 0) {
      this.snackBar.open('Đã xảy ra lỗi! Hãy thử lại sau.', 'Close', { duration: 3000 });
      return;
    }

    const targetPhase = event.container.data;
    const targetList = targetPhase.majorTasks;
    const curr = event.currentIndex;
    transferArrayItem(
      taskList,
      targetList,
      prev,
      curr
    );

    var position: number;
    const lastIndex = targetList.length - 1;
    if (curr === 0) {
      // case first item, get position of previous first item divided by 2
      position = targetList[1].position >> 1; // rightshift 1 bit is equivalent to div 2
    } else if (curr === lastIndex) {
      // case last item, get position of previous last item plus offset
      position = targetList[lastIndex - 1].position + this.offset;
    } else {
      // case between 2 items, get middle position
      position = (targetList[curr - 1].position + targetList[curr + 1].position) >> 1;
    }
    console.log(task.id);
    console.log(position);
    console.log(targetPhase.id);
    // TODO check pos < 2^4 and > 2^31
  }
}
