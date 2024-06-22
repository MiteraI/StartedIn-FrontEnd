import { Component } from '@angular/core';
import { ProjectTitleCardComponent } from '../../layouts/project-title-card/project-title-card.component';
import { TaskboardComponent } from '../../components/phase-detail-page/taskboard/taskboard.component';
import { MiniTaskItemComponent } from '../../components/phase-detail-page/mini-task-item/mini-task-item.component';
import { MatIconModule } from '@angular/material/icon';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-phase-detail-page',
  standalone: true,
  imports: [
    ProjectTitleCardComponent,
    TaskboardComponent,
    MiniTaskItemComponent,
    MatIconModule,
    DragDropModule,
    CommonModule
  ],
  templateUrl: './phase-detail-page.component.html',
  styleUrl: './phase-detail-page.component.css'
})
export class PhaseDetailPageComponent {
  boardList = ["Backlog", "Design", "In Development", "Testing"];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

  }
}