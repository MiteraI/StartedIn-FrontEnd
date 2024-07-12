import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApplicationConfigService } from "../core/config/application-config.service";
import { Observable } from "rxjs";
import { ProjectFullInfo } from "../../shared/models/project/project-full-info.model";
import { PhaseCreateModel } from "../../shared/models/project/phase-create.model";
import { CreatedResponse } from "../../shared/models/created-response.model";

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
}
