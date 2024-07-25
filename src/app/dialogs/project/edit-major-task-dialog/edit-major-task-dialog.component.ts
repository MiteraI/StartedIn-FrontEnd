import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MinorTaskTitleCardComponent } from '../../../components/project-pages/phase-list-page/minor-task-title-card/minor-task-title-card.component';
import { FormsModule } from '@angular/forms';
import { MajorTaskEditModel } from '../../../../shared/models/task/major-task-edit.model';
import { MajorTaskService } from '../../../services/major-task.service';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MinorTaskListDialogComponent } from '../minor-task-list-dialog/minor-task-list-dialog.component';
import { MajorTaskDialogInfo } from '../../../../shared/models/task/major-task-dialog-info.model';
import { MinorTask } from '../../../../shared/models/task/minor-task.model';

@Component({
  selector: 'app-edit-major-task-dialog',
  standalone: true,
  imports: [MatIconModule, CommonModule, MinorTaskTitleCardComponent, FormsModule],
  templateUrl: './edit-major-task-dialog.component.html',
  styleUrl: './edit-major-task-dialog.component.css',
})
export class EditMajorTaskDialogComponent {
  majorTaskId: string = '';
  dialogInfo: MajorTaskDialogInfo = {
    majorTask: {
      id: '',
      taskTitle: '',
      position: 0,
      description: ''
    },
    minorTasks: []
  }
  editModel: MajorTaskEditModel = {
    taskTitle: '',
    description: '',
    minorTaskIds: [],
  };
  showSaveButton = false;
  private assignableMinorTasks: MinorTask[] = [];

  constructor(
    private dialogRef: MatDialogRef<EditMajorTaskDialogComponent>,
    private snackBar: MatSnackBar,
    private majorTaskService: MajorTaskService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.majorTaskId = this.data.id;
    this.dialogInfo = this.data.dialogInfo;
    this.editModel = {
      taskTitle: this.dialogInfo.majorTask.taskTitle,
      description: this.dialogInfo.majorTask.description,
      minorTaskIds: this.dialogInfo.minorTasks.map(mt => mt.id)
    };
    this.dialogRef.backdropClick().subscribe(() => {
      this.dialogRef.close(this.editModel);
    });
    this.fetchMinorTaskList();
  }

  fetchMinorTaskList() {
    this.majorTaskService
      .getAssignableMajorTasks(this.majorTaskId)
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
        this.assignableMinorTasks = tasks;
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
    this.majorTaskService
      .editMajorTask(this.majorTaskId, this.editModel)
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
    this.majorTaskService
      .editMajorTask(this.majorTaskId, this.editModel)
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

  openAssignDialog(event: MouseEvent) {
    const midX = window.innerWidth / 2;
    const midY = window.innerHeight / 2;

    const assignDialog = this.dialog.open(MinorTaskListDialogComponent, {
      data: this.assignableMinorTasks,
      position: {
        left: event.clientX < midX ? event.clientX + "px" : undefined,
        right: event.clientX >= midX ? window.innerWidth - event.clientX + "px" : undefined,
        top: event.clientY < midY ? event.clientY + "px" : undefined,
        bottom: event.clientY >= midY ? window.innerHeight - event.clientY + "px" : undefined
      }
    });

    assignDialog.afterClosed().subscribe(result => {
      if (result) {
        this.editModel.minorTaskIds = this.editModel.minorTaskIds.concat(result);
        this.save();
        this.dialogInfo.minorTasks.concat(this.assignableMinorTasks.filter(mt => result.includes(mt.id)));
        this.assignableMinorTasks = this.assignableMinorTasks.filter(mt => !result.includes(mt.id));
      }
    });
  }

  onClose() {
    this.dialogRef.close(this.editModel);
  }
}
