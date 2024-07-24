import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MinorTaskEditModel } from '../../../../shared/models/task/minor-task-edit.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';
import { MinorTaskService } from '../../../services/minor-task.service';
import { MajorTaskBasicInfo } from '../../../../shared/models/task/major-task-basic-info.model';
import { AssignMinorToMajorDialogComponent } from '../assign-minor-to-major-dialog/assign-minor-to-major-dialog.component';

@Component({
  selector: 'app-edit-minor-task-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './edit-minor-task-dialog.component.html',
  styleUrl: './edit-minor-task-dialog.component.css',
})
export class EditMinorTaskDialogComponent {
  id: string = '';
  task: MinorTaskEditModel = {
    taskTitle: '',
    description: '',
    status: 0,
    majorTaskId: null,
  };
  showSaveButton = false;
  majorTaskName: string = "";
  private majorTasks: MajorTaskBasicInfo[] = [];

  constructor(
    private dialogRef: MatDialogRef<EditMinorTaskDialogComponent>,
    private snackBar: MatSnackBar,
    private taskService: MinorTaskService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.task = this.data.task;
    this.id = this.data.id;
    this.dialogRef.backdropClick().subscribe(() => {
      this.dialogRef.close(this.task);
    });
    this.taskService
      .getAssignableMajorTasks(this.id)
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
      .subscribe(tasks => {
        this.majorTasks = tasks;
        this.getMajorTaskName();
      });
  }

  onDescriptionFocus(): void {
    this.showSaveButton = true;
  }

  onDescriptionBlur(): void {
    setTimeout(() => {
      this.showSaveButton = false;
    }, 200);
  }

  saveDescription() {
    this.taskService
      .editMinorTask(this.id, this.task)
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
      .subscribe(() => {
        this.showSaveButton = false;
      });
  }

  save() {
    this.taskService
      .editMinorTask(this.id, this.task)
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

  getMajorTaskName() {
    this.majorTaskName = this.majorTasks.filter(m => m.id === this.task.majorTaskId)[0].taskTitle;
  }

  openAssignDialog(event: MouseEvent) {
    const midX = window.innerWidth / 2;
    const midY = window.innerHeight / 2;

    const assignDialog = this.dialog.open(AssignMinorToMajorDialogComponent, {
      data: this.majorTasks.filter(m => m.id !== this.task.majorTaskId),
      position: {
        left: event.clientX < midX ? event.clientX + "px" : undefined,
        right: event.clientX >= midX ? window.innerWidth - event.clientX + "px" : undefined,
        top: event.clientY < midY ? event.clientY + "px" : undefined,
        bottom: event.clientY >= midY ? window.innerHeight - event.clientY + "px" : undefined
      }
    });

    assignDialog.afterClosed().subscribe(result => {
      if (result) {
        this.task.majorTaskId = result;
        this.getMajorTaskName();
        this.save();
      }
    });
  }

  removeFromMajorTask() {
    this.task.majorTaskId = null;
    this.save();
  }

  onClose() {
    this.dialogRef.close(this.task);
  }
}
