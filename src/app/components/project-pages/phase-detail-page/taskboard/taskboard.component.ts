import { Component, Input } from '@angular/core';
import { MiniTaskItemComponent } from '../mini-task-item/mini-task-item.component';
import { MatIconModule } from '@angular/material/icon';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Taskboard } from '../../../../../shared/models/task/taskboard.model';
import { TaskService } from '../../../../services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MinorTaskMoveModel } from '../../../../../shared/models/task/minor-task-move.model';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'taskboard',
  standalone: true,
  imports: [MiniTaskItemComponent, MatIconModule, DragDropModule, CommonModule],
  templateUrl: './taskboard.component.html',
  styleUrl: './taskboard.component.css'
})
export class TaskboardComponent {
  @Input({required: true}) taskboard: Taskboard = {
    id: "",
    title: "",
    position: 0,
    phaseId: "",
    minorTasks: []
  }
  private currMaxPos: number = 0;
  private offset = 1 << 16; // 2^16 or 65536
  private lowerBoundPos = 1 << 4; // 2^4 or 16
  private upperBoundPos = 1 << 30; // 2^30 or 1,073,741,824

  constructor(
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if (this.taskboard.minorTasks.length > 0) {
      this.currMaxPos = this.taskboard.minorTasks[this.taskboard.minorTasks.length - 1].position;
    }
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
    this.taskService.moveMinorTask(movement).pipe(
      catchError(error => {
        this.snackBar.open(
          'Đã xảy ra lỗi! Những thay đổi của bạn có thể sẽ không được lưu. Hãy tải lại trang.',
          'Close',
          { duration: 3000 }
        );
        return throwError(() => new Error(error.error));
      })
    );
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

    const targetPhase = event.container.data;
    const targetList = targetPhase.minorTasks;
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
    this.taskService.moveMinorTask(movement).pipe(
      catchError(error => {
        this.snackBar.open(
          'Đã xảy ra lỗi! Những thay đổi của bạn có thể sẽ không được lưu. Hãy tải lại trang.',
          'Close',
          { duration: 3000 }
        );
        return throwError(() => new Error(error.error));
      })
    );
  }

  redistributeTasks() {
    var newPos = this.offset;
    for (var task of this.taskboard.minorTasks) {
      task.position = newPos;
      newPos += this.offset;
    }
  }
}
