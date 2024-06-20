import { Component } from '@angular/core';
import { ProjectTitleCardComponent } from '../../layouts/project-title-card/project-title-card.component';
import { TaskboardComponent } from '../../components/phase-detail-page/taskboard/taskboard.component';
import { MiniTaskItemComponent } from '../../components/phase-detail-page/mini-task-item/mini-task-item.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-phase-detail-page',
  standalone: true,
  imports: [ProjectTitleCardComponent, TaskboardComponent, MiniTaskItemComponent, MatIconModule],
  templateUrl: './phase-detail-page.component.html',
  styleUrl: './phase-detail-page.component.css'
})
export class PhaseDetailPageComponent {

}
