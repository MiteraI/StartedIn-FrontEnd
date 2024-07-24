import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { MinorTask } from '../../../../../shared/models/task/minor-task.model';
import { EditMinorTaskDialogComponent } from '../../../../dialogs/project/edit-minor-task-dialog/edit-minor-task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mini-task-item',
  standalone: true,
  imports: [DragDropModule, CommonModule],
  templateUrl: './mini-task-item.component.html',
  styleUrl: './mini-task-item.component.css'
})
export class MiniTaskItemComponent {
  @Input({required: true}) task: MinorTask = {
    id: "",
    taskTitle: "",
    description: "",
    status: 0,
    position: 0,
    majorTaskId: null,
  };

  constructor(private dialog: MatDialog) {}

  openEditMinorTaskDialog() {
    const dialogRef = this.dialog.open(EditMinorTaskDialogComponent, {
      data: {
        id: this.task.id,
        task: {
          taskTitle: this.task.taskTitle,
          description: this.task.description,
          status: this.task.status,
          majorTaskId: this.task.majorTaskId
        }
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.task.taskTitle = result.taskTitle;
        this.task.description = result.description;
        this.task.status = result.status;
        this.task.majorTaskId = result.majorTaskId;
      }
    });
  }
}
