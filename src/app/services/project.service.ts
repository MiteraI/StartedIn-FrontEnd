import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApplicationConfigService } from "../core/config/application-config.service";
import { Observable } from "rxjs";
import { ProjectFullInfo } from "../../shared/models/project/project-full-info.model";
import { PhaseCreateModel } from "../../shared/models/project/phase-create.model";
import { CreatedResponse } from "../../shared/models/created-response.model";
import { PhaseMoveModel } from "../../shared/models/project/phase-move.model";
import { ProjectList } from "../../shared/models/project/project-list.model";
import { PhaseFullInfo } from "../../shared/models/project/phase-full-info.model";

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(
    private http: HttpClient,
    private applicationConfigService: ApplicationConfigService
  ) {}

  getProject(id: string): Observable<any> {
    return this.http.get<ProjectFullInfo>(this.applicationConfigService.getEndpointFor(`/api/projects/${id}`));
  }

  createPhase(phase: PhaseCreateModel): Observable<any> {
    return this.http.post<CreatedResponse>(this.applicationConfigService.getEndpointFor('/api/phase/create'), phase);
  }

  getTeamListProjects(teamId: string): Observable<any> {
    return this.http.get<ProjectList[]>(
      this.applicationConfigService.getEndpointFor(`/api/team/${teamId}/projects`)
    );
  }

  movePhase(movement: PhaseMoveModel): Observable<any> {
    return this.http.put(this.applicationConfigService.getEndpointFor('/api/phase/move'), movement);
  }

  getPhaseDetail(id: string): Observable<any> {
    return this.http.get<PhaseFullInfo>(this.applicationConfigService.getEndpointFor(`/api/phase/${id}`));
  }
}
