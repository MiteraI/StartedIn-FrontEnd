import { Component, Input } from '@angular/core';
import { ProjectTeam } from '../../../../../shared/models/project/project-team.model';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { MatIconModule } from '@angular/material/icon';
import { CreateTeamButtonComponent } from '../create-team-button/create-team-button.component';

@Component({
  selector: 'team-project-list',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, MatIconModule, CreateTeamButtonComponent],
  templateUrl: './team-project-list.component.html',
  styleUrl: './team-project-list.component.css'
})
export class TeamProjectListComponent {
  @Input({required: true}) team: ProjectTeam | null = null;
  @Input() showCreateProject: boolean = true;
}
