import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { MinorTask } from '../../../../../shared/models/task/minor-task.model';

@Component({
  selector: 'mini-task-item',
  standalone: true,
  imports: [DragDropModule],
  templateUrl: './mini-task-item.component.html',
  styleUrl: './mini-task-item.component.css'
})
export class MiniTaskItemComponent {
  @Input({required: true}) task: MinorTask = {
    id: "",
    taskTitle: "",
    description: "",
    status: "",
    position: 0
  };
}
