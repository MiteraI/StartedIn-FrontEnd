import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'phase-dropdown',
  standalone: true,
  imports: [MatIconModule, CommonModule, RouterModule, DragDropModule],
  templateUrl: './phase-dropdown.component.html',
  styleUrl: './phase-dropdown.component.css'
})
export class PhaseDropdownComponent {
  @Input({required: true}) phaseName: string = "";
  taskList = ["Task 1", "Task 2", "Task 3"]
  expanded: boolean = true;

  toggleExpand() {
    this.expanded = !this.expanded;
  }

  showEditPopup(event: Event) {
    event.stopPropagation();
  }

  showDeletePopup(event: Event) {
    event.stopPropagation();
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
