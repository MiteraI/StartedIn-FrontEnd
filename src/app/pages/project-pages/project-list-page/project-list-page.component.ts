import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TeamProjectListComponent } from '../../../components/project-pages/project-list-page/team-project-list/team-project-list.component';
import { ProjectTeam } from '../../../../shared/models/project/project-team.model';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { TeamService } from '../../../services/team.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-project-list-page',
  standalone: true,
  imports: [MatIconModule, CommonModule, TeamProjectListComponent, MatProgressSpinnerModule],
  templateUrl: './project-list-page.component.html',
  styleUrl: './project-list-page.component.css'
})
export class ProjectListPageComponent {
  yourTeams: ProjectTeam[] = new Array<ProjectTeam>();
  yourTeamsSubject$: BehaviorSubject<ProjectTeam[]> = new BehaviorSubject(this.yourTeams);
  isLoadingYourTeams: boolean = true;
  isYourTeamsEmpty: boolean = false;
  isYourTeamsCallFailed: boolean = false;
  guestTeams: ProjectTeam[] = new Array<ProjectTeam>();
  guestTeamsSubject$: BehaviorSubject<ProjectTeam[]> = new BehaviorSubject(this.guestTeams);
  isLoadingGuestTeams: boolean = true;
  isGuestTeamsEmpty: boolean = false;
  isGuestTeamsCallFailed: boolean = false;

  constructor(private teamService: TeamService) { }

  ngOnInit() {
    this.yourTeamsSubject$.subscribe(teams => this.yourTeams = teams);
    this.guestTeamsSubject$.subscribe(teams => this.guestTeams = teams);
    this.teamService
      .getYourTeams()
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 404) {
            this.isLoadingYourTeams = false;
            this.isYourTeamsEmpty = true;
          } else if (error instanceof HttpErrorResponse && error.status === 400) {
            this.isLoadingYourTeams = false;
            this.isYourTeamsCallFailed = true;
          }
          return throwError(() => new Error(error.error));
        })
      )
      .subscribe(teams => {
        this.yourTeamsSubject$.next(teams);
        this.isLoadingYourTeams = false;
      });
    this.teamService
      .getGuestTeams()
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 404) {
            this.isLoadingGuestTeams = false;
            this.isGuestTeamsEmpty = true;
          } else if (error instanceof HttpErrorResponse && error.status === 400) {
            this.isLoadingGuestTeams = false;
            this.isGuestTeamsCallFailed = true;
          }
          return throwError(() => new Error(error.error));
        })
      )
      .subscribe(teams => {
        this.guestTeamsSubject$.next(teams);
        this.isLoadingGuestTeams = false;
      });
  }
}
