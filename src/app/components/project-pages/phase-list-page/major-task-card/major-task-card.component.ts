import { Component, Input } from '@angular/core';
import { MajorTaskBasicInfo } from '../../../../../shared/models/task/major-task-basic-info.model';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditMajorTaskDialogComponent } from '../../../../dialogs/project/edit-major-task-dialog/edit-major-task-dialog.component';
import { firstValueFrom } from 'rxjs';
import { MajorTaskService } from '../../../../services/major-task.service';

@Component({
  selector: 'major-task-card',
  standalone: true,
  imports: [DragDropModule, MatProgressBarModule, CommonModule],
  templateUrl: './major-task-card.component.html',
  styleUrl: './major-task-card.component.css',
})
export class MajorTaskCardComponent {
  @Input({ required: true }) task: MajorTaskBasicInfo = {
    id: '',
    taskTitle: '',
    description: '',
    position: 0,
  };
  @Input() progress: number = 40;

  constructor(
    private dialog: MatDialog,
    private majorTaskService: MajorTaskService
  ) {}
  async openEditMajorTaskDialog() {
    const resolvedData = await firstValueFrom(this.majorTaskService.getMajorTaskById(this.task.id));
    const dialogRef = this.dialog.open(EditMajorTaskDialogComponent, {
      data: {
        task: resolvedData,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.task.taskTitle = result.taskTitle;
        this.task.description = result.description;
      }
    });

    dialogRef.backdropClick().subscribe(() => {
      console.log('backdrop clicked');
    });
  }
}
