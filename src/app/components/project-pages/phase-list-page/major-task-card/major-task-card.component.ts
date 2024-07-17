import { Component, Input } from '@angular/core';
import { MajorTaskBasicInfo } from '../../../../../shared/models/task/major-task-basic-info.model';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'major-task-card',
  standalone: true,
  imports: [DragDropModule, MatProgressBarModule, CommonModule],
  templateUrl: './major-task-card.component.html',
  styleUrl: './major-task-card.component.css'
})
export class MajorTaskCardComponent {
  @Input({required: true}) task: MajorTaskBasicInfo = {
    id: "",
    taskTitle: "",
    description: "",
    position: 0,
  }
  @Input() progress: number = 40;
}
