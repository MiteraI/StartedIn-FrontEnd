import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ProjectBasicInfo } from '../../../../../shared/models/project/project-basic-info.model';

@Component({
  selector: 'project-card',
  standalone: true,
  imports: [MatIconModule, RouterModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css'
})
export class ProjectCardComponent {
  @Input({required: true}) project: ProjectBasicInfo | null = null;
}
