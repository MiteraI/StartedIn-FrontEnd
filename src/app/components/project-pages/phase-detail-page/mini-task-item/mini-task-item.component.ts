import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'mini-task-item',
  standalone: true,
  imports: [DragDropModule],
  templateUrl: './mini-task-item.component.html',
  styleUrl: './mini-task-item.component.css'
})
export class MiniTaskItemComponent {
  @Input({required: true}) taskName: string = "";
}
