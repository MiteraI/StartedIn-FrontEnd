import { Component, Input } from '@angular/core';
import { MinorTaskBasicInfo } from '../../../../../shared/models/task/minor-task-basic-info.model';

@Component({
  selector: 'app-minor-task-title-card',
  standalone: true,
  imports: [],
  templateUrl: './minor-task-title-card.component.html',
  styleUrl: './minor-task-title-card.component.css',
})
export class MinorTaskTitleCardComponent {
  @Input() minorTask: MinorTaskBasicInfo = {
    position: 0,
    taskTitle: '',
    description: '',
    status: '',
    majorTaskId: '',
    taskboardId: '',
  };
  constructor() {}

  ngOnInit() {
    console.log(this.minorTask);
  }
}
