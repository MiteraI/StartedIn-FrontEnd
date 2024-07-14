import { Component, Input } from '@angular/core';
import { MiniTaskItemComponent } from '../mini-task-item/mini-task-item.component';
import { MatIconModule } from '@angular/material/icon';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Taskboard } from '../../../../../shared/models/task/taskboard.model';

@Component({
  selector: 'taskboard',
  standalone: true,
  imports: [MiniTaskItemComponent, MatIconModule, DragDropModule, CommonModule],
  templateUrl: './taskboard.component.html',
  styleUrl: './taskboard.component.css'
})
export class TaskboardComponent {
  @Input({required: true}) taskboard: Taskboard = {
    id: "",
    title: "",
    position: 0,
    phaseId: "",
    minorTasks: []
  }

  drop(event: CdkDragDrop<Taskboard>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data.minorTasks, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data.minorTasks,
                        event.container.data.minorTasks,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
