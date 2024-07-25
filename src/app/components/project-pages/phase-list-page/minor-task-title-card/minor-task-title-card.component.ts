import { Component, Input } from '@angular/core';
import { MinorTask } from '../../../../../shared/models/task/minor-task.model';

@Component({
  selector: 'minor-task-title-card',
  standalone: true,
  imports: [],
  templateUrl: './minor-task-title-card.component.html',
  styleUrl: './minor-task-title-card.component.css',
})
export class MinorTaskTitleCardComponent {
  @Input() minorTask: MinorTask = {
    id: '',
    taskTitle: '',
    description: '',
    status: 0,
    position: 0,
    majorTaskId: ''
  };
}
