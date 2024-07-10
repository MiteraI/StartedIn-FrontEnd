import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApplicationConfigService } from "../core/config/application-config.service";
import { Observable } from "rxjs";
import { ProjectTeam } from "../../shared/models/project/project-team.model";

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(
    private http: HttpClient,
    private applicationConfigService: ApplicationConfigService
  ) {}

  getYourTeams(): Observable<any> {
    return this.http.get<ProjectTeam[]>(this.applicationConfigService.getEndpointFor('/api/teams/user-leader-team'));
  }

  getGuestTeams(): Observable<any> {
    return this.http.get<ProjectTeam[]>(this.applicationConfigService.getEndpointFor('/api/teams/user-guest-team'));
  }
}
