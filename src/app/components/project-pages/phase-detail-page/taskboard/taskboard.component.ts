import { Component, Input } from '@angular/core';
import { MiniTaskItemComponent } from '../mini-task-item/mini-task-item.component';
import { MatIconModule } from '@angular/material/icon';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Taskboard } from '../../../../../shared/models/task/taskboard.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MinorTaskMoveModel } from '../../../../../shared/models/task/minor-task-move.model';
import { catchError, throwError } from 'rxjs';
import { MinorTaskCreateComponent } from '../minor-task-create/minor-task-create.component';
import { MinorTaskCreateModel } from '../../../../../shared/models/task/minor-task-create.model';
import { MinorTaskService } from '../../../../services/minor-task.service';
import { ClickOutsideDirective } from '../../../../../shared/directives/click-outside.directive';
import { TaskBoardService } from '../../../../services/task-board.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'taskboard',
  standalone: true,
  imports: [
    MiniTaskItemComponent,
    MinorTaskCreateComponent,
    MatIconModule,
    DragDropModule,
    CommonModule,
    ClickOutsideDirective,
  ],
  templateUrl: './taskboard.component.html',
  styleUrl: './taskboard.component.css',
})
export class TaskboardComponent {
  @Input({ required: true }) taskboard: Taskboard = {
    id: '',
    title: '',
    position: 0,
    phaseId: '',
    minorTasks: [],
  };
  private currMaxPos: number = 0;
  private offset = 1 << 16; // 2^16 or 65536
  private lowerBoundPos = 1 << 4; // 2^4 or 16
  private upperBoundPos = 1 << 30; // 2^30 or 1,073,741,824

  constructor(
    private minorTaskService: MinorTaskService,
    private taskboardService: TaskBoardService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    console.log(this.taskboard);

    if (this.taskboard.minorTasks.length > 0) {
      this.currMaxPos = this.taskboard.minorTasks[this.taskboard.minorTasks.length - 1].position;
    }
  }

  submitTask(task: MinorTaskCreateModel) {
    task.position = this.currMaxPos + this.offset;
    task.taskboardId = this.taskboard.id;
    this.currMaxPos = task.position;
    var newItem = {
      id: '',
      taskTitle: task.taskTitle,
      description: task.description,
      position: task.position,
      status: 'Đang chờ',
    };
    this.taskboard.minorTasks.push(newItem);
    this.minorTaskService
      .createMinorTask(task)
      .pipe(
        catchError(error => {
          this.snackBar.open('Đã xảy ra lỗi! Hãy thử lại sau.', 'Close', { duration: 3000 });
          var index = this.taskboard.minorTasks.indexOf(newItem);
          if (index !== -1) {
            this.taskboard.minorTasks.splice(index, 1);
          }
          return throwError(() => new Error(error.error));
        })
      )
      .subscribe(response => (newItem.id = response.id));
    // TODO IMPORTANT check id empty before edit & move position
  }

  drop(event: CdkDragDrop<Taskboard>) {
    if (event.previousContainer === event.container) {
      // no changes
      if (event.previousIndex === event.currentIndex) {
        return;
      }
      this.moveItem(event);
    } else {
      this.transferItem(event);
    }
  }

  moveItem(event: CdkDragDrop<Taskboard>) {
    const taskList = event.container.data.minorTasks;
    const prev = event.previousIndex;
    const task = taskList[prev];
    if (task.id && task.id.length === 0) {
      // if id is null or empty, possibly because an add request was recently made and server hasn't returned the id,
      // then do nothing
      this.snackBar.open('Đã xảy ra lỗi! Hãy thử lại sau.', 'Close', { duration: 3000 });
      return;
    }

    const curr = event.currentIndex;
    moveItemInArray(taskList, prev, curr);

    var position: number;
    var needsReposition: boolean;
    const lastIndex = taskList.length - 1;
    if (curr === 0) {
      // case first item, get position of previous first item divided by 2
      position = taskList[1].position >> 1; // rightshift 1 bit is equivalent to div 2
      // if position of item is too close to the start, update flag
      needsReposition = position < this.lowerBoundPos;
    } else if (curr === lastIndex) {
      // case last item, get position of previous last item plus offset
      position = taskList[lastIndex - 1].position + this.offset;
      // if position of item is too far from the start, update flag
      needsReposition = position > this.upperBoundPos;
    } else {
      // case between 2 items, get middle position
      position = (taskList[curr - 1].position + taskList[curr + 1].position) >> 1;
      // if position of item is too close to adjacent items, update flag
      needsReposition = position - taskList[curr - 1].position < this.lowerBoundPos;
    }
    task.position = position;
    if (needsReposition) {
      this.redistributeTasks();
    }

    const movement: MinorTaskMoveModel = {
      id: task.id,
      position: position,
      taskboardId: this.taskboard.id,
      needsReposition: needsReposition,
    };
    this.minorTaskService
      .moveMinorTask(movement)
      .pipe(
        catchError(error => {
          this.snackBar.open(
            'Đã xảy ra lỗi! Những thay đổi của bạn có thể sẽ không được lưu. Hãy tải lại trang.',
            'Close',
            { duration: 3000 }
          );
          return throwError(() => new Error(error.error));
        })
      )
      .subscribe();
  }

  transferItem(event: CdkDragDrop<Taskboard>) {
    const taskList = event.previousContainer.data.minorTasks;
    const prev = event.previousIndex;
    const task = taskList[prev];
    if (task.id && task.id.length === 0) {
      // if id is null or empty, possibly because an add request was recently made and server hasn't returned the id,
      // then do nothing
      this.snackBar.open('Đã xảy ra lỗi! Hãy thử lại sau.', 'Close', { duration: 3000 });
      return;
    }

    const targetBoard = event.container.data;
    const targetList = targetBoard.minorTasks;
    const curr = event.currentIndex;
    transferArrayItem(taskList, targetList, prev, curr);

    var position: number;
    var needsReposition: boolean;
    const lastIndex = targetList.length - 1;
    if (curr === 0) {
      // case first item, get position of previous first item divided by 2
      position = targetList[1].position >> 1; // rightshift 1 bit is equivalent to div 2
      // if position of item is too close to the start, update flag
      needsReposition = position < this.lowerBoundPos;
    } else if (curr === lastIndex) {
      // case last item, get position of previous last item plus offset
      position = targetList[lastIndex - 1].position + this.offset;
      // if position of item is too far from the start, update flag
      needsReposition = position > this.upperBoundPos;
    } else {
      // case between 2 items, get middle position
      position = (targetList[curr - 1].position + targetList[curr + 1].position) >> 1;
      // if position of item is too close to adjacent items, update flag
      needsReposition = position - targetList[curr - 1].position < this.lowerBoundPos;
    }
    task.position = position;
    if (needsReposition) {
      this.redistributeTasks();
    }

    const movement: MinorTaskMoveModel = {
      id: task.id,
      position: position,
      taskboardId: this.taskboard.id,
      needsReposition: needsReposition,
    };
    this.minorTaskService
      .moveMinorTask(movement)
      .pipe(
        catchError(error => {
          this.snackBar.open(
            'Đã xảy ra lỗi! Những thay đổi của bạn có thể sẽ không được lưu. Hãy tải lại trang.',
            'Close',
            { duration: 3000 }
          );
          return throwError(() => new Error(error.error));
        })
      )
      .subscribe();
  }

  redistributeTasks() {
    var newPos = 0;
    for (var task of this.taskboard.minorTasks) {
      newPos += this.offset;
      task.position = newPos;
    }
    this.currMaxPos = newPos;
  }

  completeEditTaskboardTitle(title: string) {
    this.taskboardService
      .editTaskboard(title, this.taskboard.id)
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 400) {
            this.snackBar.open(error.error, 'Đóng', { duration: 3000 });
          }
          return error;
        })
      )
      .subscribe();
  }
}
