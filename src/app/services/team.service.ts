import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from '../core/config/application-config.service';
import { Observable } from 'rxjs';
import { ProjectTeam } from '../../shared/models/project/project-team.model';
import { CreateTeamRequest } from '../../shared/models/project/team/create-team-request.model';
import { TeamProjectDetails } from '../../shared/models/project/team/team-project-details.model';
import { TeamInviteView } from '../../shared/models/project/team/team-invite-view.model';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(
    private http: HttpClient,
    private applicationConfigService: ApplicationConfigService
  ) {}

  // Create team and project at the same time with the same name
  createTeam(createTeamRequest: CreateTeamRequest): Observable<ProjectTeam> {
    return this.http.post<ProjectTeam>(
      this.applicationConfigService.getEndpointFor('/api/teams'),
      createTeamRequest
    );
  }

  // Send mail invitation to other user to join team
  sendInvitationToUserEmails(emailList: string[], teamId: string): Observable<any> {
    return this.http.post(
      this.applicationConfigService.getEndpointFor(`/api/teams/team-invitation/${teamId}`),
      emailList,
      {
        responseType: 'text' as 'json',
      }
    );
  }

  getTeamById(teamId: string): Observable<TeamProjectDetails> {
    return this.http.get<TeamProjectDetails>(
      this.applicationConfigService.getEndpointFor(`/api/teams/${teamId}`)
    );
  }

  // For anonymous user to view team invitation
  viewTeamById(teamId: string): Observable<TeamInviteView> {
    return this.http.get<TeamInviteView>(
      this.applicationConfigService.getEndpointFor(`/api/invite/view/${teamId}`)
    );
  }

  getYourTeams(): Observable<any> {
    return this.http.get<ProjectTeam[]>(
      this.applicationConfigService.getEndpointFor('/api/teams/user-leader-team')
    );
  }

  getGuestTeams(): Observable<any> {
    return this.http.get<ProjectTeam[]>(
      this.applicationConfigService.getEndpointFor('/api/teams/user-guest-team')
    );
  }

  joinTeamByTeamId(teamId: string): Observable<any> {
    return this.http.post(
      this.applicationConfigService.getEndpointFor(`/api/invite/add/${teamId}`),
      null,
      {
        responseType: 'text' as 'json',
      }
    );
  }
}
