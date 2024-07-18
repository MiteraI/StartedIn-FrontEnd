import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../../../services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MinorTaskEditModel } from '../../../../shared/models/task/minor-task-edit.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

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

  constructor(
    private dialogRef: MatDialogRef<EditMinorTaskDialogComponent>,
    private snackBar: MatSnackBar,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.task = this.data.task;
    this.id = this.data.id;
    this.dialogRef.backdropClick().subscribe(() => {
      this.dialogRef.close(this.task);
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

  onCancel() {
    this.dialogRef.close(this.task);
  }

  onClose() {
    this.dialogRef.close(this.task);
  }
}
