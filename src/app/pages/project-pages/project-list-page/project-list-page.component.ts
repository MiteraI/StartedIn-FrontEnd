import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TeamProjectListComponent } from '../../../components/project-pages/project-list-page/team-project-list/team-project-list.component';
import { ProjectTeam } from '../../../../shared/models/project/project-team.model';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { TeamService } from '../../../services/team.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CreateTeamButtonComponent } from '../../../components/project-pages/project-list-page/create-team-button/create-team-button.component';

@Component({
  selector: 'app-project-list-page',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    TeamProjectListComponent,
    MatProgressSpinnerModule,
    CreateTeamButtonComponent,
  ],
  templateUrl: './project-list-page.component.html',
  styleUrl: './project-list-page.component.css',
})
export class ProjectListPageComponent {
  yourTeams: ProjectTeam[] = new Array<ProjectTeam>();
  isLoadingYourTeams: boolean = true;
  isYourTeamsCallFailed: boolean = false;
  guestTeams: ProjectTeam[] = new Array<ProjectTeam>();
  isLoadingGuestTeams: boolean = true;
  isGuestTeamsCallFailed: boolean = false;

  constructor(private teamService: TeamService) {}

  ngOnInit() {
    this.teamService
      .getYourTeams()
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 404) {
            this.isLoadingYourTeams = false;
          } else if (error instanceof HttpErrorResponse && error.status === 400) {
            this.isLoadingYourTeams = false;
            this.isYourTeamsCallFailed = true;
          }
          return throwError(() => new Error(error.error));
        })
      )
      .subscribe(teams => {
        this.isLoadingYourTeams = false;
        this.yourTeams = teams;
      });
    this.teamService
      .getGuestTeams()
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 404) {
            this.isLoadingGuestTeams = false;
          } else if (error instanceof HttpErrorResponse && error.status === 400) {
            this.isLoadingGuestTeams = false;
            this.isGuestTeamsCallFailed = true;
          }
          return throwError(() => new Error(error.error));
        })
      )
      .subscribe(teams => {
        this.isLoadingGuestTeams = false;
        this.guestTeams = teams;
      });
  }

  addCreatedTeam(createdTeam: ProjectTeam): void {
    this.yourTeams.push(createdTeam);
  }
}
