import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PhaseListItem } from '../../../../../shared/models/project/phase-list-item.model';
import { MajorTaskBasicInfo } from '../../../../../shared/models/task/major-task-basic-info.model';

@Component({
  selector: 'phase-dropdown',
  standalone: true,
  imports: [MatIconModule, CommonModule, RouterModule, DragDropModule, MatProgressBarModule],
  templateUrl: './phase-dropdown.component.html',
  styleUrl: './phase-dropdown.component.css'
})
export class PhaseDropdownComponent {
  @Input({required: true}) phase: PhaseListItem = {
    id: "",
    phaseName: "",
    position: 0,
    majorTasks: []
  };
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

  drop(event: CdkDragDrop<MajorTaskBasicInfo[]>) {
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
