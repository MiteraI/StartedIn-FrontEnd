import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { MiniTask } from '../../../../../shared/models/task/mini-task.model';

@Component({
  selector: 'mini-task-item',
  standalone: true,
  imports: [DragDropModule],
  templateUrl: './mini-task-item.component.html',
  styleUrl: './mini-task-item.component.css'
})
export class MiniTaskItemComponent {
  @Input({required: true}) taskName: string = "";
  task: MiniTask = {
    id: "",
    name: "",
    description: "",
    status: "",
    position: 0
  };
}
