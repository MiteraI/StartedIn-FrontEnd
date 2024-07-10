import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TeamProjectListComponent } from '../../../components/project-pages/project-list-page/team-project-list/team-project-list.component';
import { ProjectTeam } from '../../../../shared/models/project/project-team.model';
import { BehaviorSubject } from 'rxjs';
import { TeamService } from '../../../services/team.service';

@Component({
  selector: 'app-project-list-page',
  standalone: true,
  imports: [MatIconModule, CommonModule, TeamProjectListComponent],
  templateUrl: './project-list-page.component.html',
  styleUrl: './project-list-page.component.css'
})
export class ProjectListPageComponent {
  yourTeams: ProjectTeam[] = new Array<ProjectTeam>();
  yourTeamsSubject$: BehaviorSubject<ProjectTeam[]> = new BehaviorSubject(this.yourTeams);
  isloadingYourTeams: boolean = true;
  guestTeams: ProjectTeam[] = new Array<ProjectTeam>();
  guestTeamsSubject$: BehaviorSubject<ProjectTeam[]> = new BehaviorSubject(this.guestTeams);

  constructor(private teamService: TeamService) { }

  ngOnInit() {
    this.yourTeamsSubject$.subscribe(teams => this.yourTeams = teams);
    this.guestTeamsSubject$.subscribe(teams => this.guestTeams = teams);
    this.teamService.getYourTeams().subscribe(teams => {
      this.yourTeamsSubject$.next(teams);
      this.isloadingYourTeams = false;
    });
    this.teamService.getGuestTeams().subscribe(teams => this.guestTeamsSubject$.next(teams));
  }
}
