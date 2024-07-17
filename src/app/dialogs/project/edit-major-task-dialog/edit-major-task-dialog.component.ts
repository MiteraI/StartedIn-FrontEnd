import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/task.service';
import { MajorTaskDialogInfo } from '../../../../shared/models/task/major-task-dialog-info.model';
import { MinorTaskTitleCardComponent } from '../../../components/project-pages/phase-list-page/minor-task-title-card/minor-task-title-card.component';
import { FormsModule } from '@angular/forms';
import { MajorTaskEditInfo } from '../../../../shared/models/task/major-task-edit-info.model';

@Component({
  selector: 'app-edit-major-task-dialog',
  standalone: true,
  imports: [MatIconModule, CommonModule, MinorTaskTitleCardComponent, FormsModule],
  templateUrl: './edit-major-task-dialog.component.html',
  styleUrl: './edit-major-task-dialog.component.css',
})
export class EditMajorTaskDialogComponent {
  taskDialog: MajorTaskDialogInfo | null = null;
  majorTask: MajorTaskEditInfo = {
    id: '',
    taskTitle: '',
    description: '',
  };
  showSaveButton = false;
  constructor(
    private dialogRef: MatDialogRef<EditMajorTaskDialogComponent>,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.taskDialog = this.data.task;
    this.majorTask = {
      id: this.taskDialog?.majorTask.id || '',
      taskTitle: this.taskDialog?.majorTask?.taskTitle || '',
      description: this.taskDialog?.majorTask.description || '',
    };

    this.dialogRef.backdropClick().subscribe(() => {
      this.dialogRef.close(this.majorTask);
    });

    this.addData();
  }
  onDescriptionFocus(): void {
    this.showSaveButton = true;
  }

  onDescriptionBlur(): void {
    setTimeout(() => {
      this.showSaveButton = false;
    }, 200);
  }
  saveMajorTask() {
    this.taskService.editMajorTask(this.majorTask).subscribe(() => {
      this.showSaveButton = false;
    });
  }

  saveMajorTitle() {
    this.taskService.editMajorTask(this.majorTask).subscribe(() => {});
  }

  addData() {
    this.taskDialog?.minorTasks.push({
      position: 0,
      taskTitle: 'Skibidi',
      description: 'dsadasdas',
      status: 'dasdasd',
      majorTaskId: 'dadasd',
      taskboardId: 'dadasd',
    });
  }

  onCancel() {
    this.dialogRef.close(this.majorTask);
  }

  onClose() {
    this.dialogRef.close(this.majorTask);
  }
}
