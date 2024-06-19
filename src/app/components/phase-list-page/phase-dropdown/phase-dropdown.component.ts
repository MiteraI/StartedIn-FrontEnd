import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'phase-dropdown',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './phase-dropdown.component.html',
  styleUrl: './phase-dropdown.component.css'
})
export class PhaseDropdownComponent {
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
}
