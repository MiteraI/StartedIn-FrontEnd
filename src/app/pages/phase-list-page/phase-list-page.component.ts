import { Component } from '@angular/core';
import { ProjectTitleCardComponent } from '../../layouts/project-title-card/project-title-card.component';
import { PhaseDropdownComponent } from '../../components/phase-list-page/phase-dropdown/phase-dropdown.component';
import { MatIconModule } from '@angular/material/icon';
import { PhaseCreateComponent } from '../../components/phase-list-page/phase-create/phase-create.component';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-phase-list-page',
  standalone: true,
  imports: [
    ProjectTitleCardComponent,
    PhaseDropdownComponent,
    PhaseCreateComponent,
    MatIconModule,
    DragDropModule,
    CommonModule
  ],
  templateUrl: './phase-list-page.component.html',
  styleUrl: './phase-list-page.component.css'
})
export class PhaseListPageComponent {
  list = ['1', '2', '3'];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }
}
