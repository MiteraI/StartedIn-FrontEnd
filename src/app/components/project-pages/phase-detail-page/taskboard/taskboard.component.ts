import { Component, Input } from '@angular/core';
import { MiniTaskItemComponent } from '../mini-task-item/mini-task-item.component';
import { MatIconModule } from '@angular/material/icon';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Taskboard } from '../../../../../shared/models/project/taskboard.model';

@Component({
  selector: 'taskboard',
  standalone: true,
  imports: [MiniTaskItemComponent, MatIconModule, DragDropModule, CommonModule],
  templateUrl: './taskboard.component.html',
  styleUrl: './taskboard.component.css'
})
export class TaskboardComponent {
  @Input({required: true}) boardName: string = "";
  taskList = ["Mini Task 1", "Mini Task 2", "Mini Task 3"];
  taskboard: Taskboard = {
    id: "",
    name: "",
    position: 0,
    tasks: []
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
