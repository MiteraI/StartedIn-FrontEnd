import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/task.service';
import { MajorTaskDialogInfo } from '../../../../shared/models/task/major-task-dialog-info.model';
import { MinorTaskTitleCardComponent } from '../../../components/project-pages/phase-list-page/minor-task-title-card/minor-task-title-card.component';

@Component({
  selector: 'app-edit-major-task-dialog',
  standalone: true,
  imports: [MatIconModule, CommonModule, MinorTaskTitleCardComponent],
  templateUrl: './edit-major-task-dialog.component.html',
  styleUrl: './edit-major-task-dialog.component.css',
})
export class EditMajorTaskDialogComponent {
  taskDialog: MajorTaskDialogInfo | null = null;
  constructor(
    private dialogRef: MatDialogRef<EditMajorTaskDialogComponent>,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.taskService.getMajorTaskById(this.data.task.id).subscribe(task => {
      this.taskDialog = task;

      this.addData();
      this.addData();
      this.addData();

      console.log(this.taskDialog);
    });
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
}
