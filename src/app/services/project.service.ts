import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApplicationConfigService } from "../core/config/application-config.service";
import { BehaviorSubject, Observable } from "rxjs";
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
  phase: PhaseFullInfo = {
    id: "",
    phaseName: "Ideation Phase",
    projectId: "",
    taskboards: [
      {
        id: "",
        title: "Backend",
        position: 1000,
        phaseId: "",
        minorTasks: [
          {
            id: "",
            taskTitle: "A Task",
            description: "A Task Description",
            status: "Done",
            position: 1000
          },
          {
            id: "",
            taskTitle: "Another Task",
            description: "Another Task Description",
            status: "Done",
            position: 2000
          },
          {
            id: "",
            taskTitle: "Yet Another Task",
            description: "Yet Another Task Description",
            status: "Done",
            position: 3000
          }
        ]
      },
      {
        id: "",
        title: "Frontend",
        position: 2000,
        phaseId: "",
        minorTasks: [
          {
            id: "",
            taskTitle: "A Task",
            description: "A Task Description",
            status: "Done",
            position: 1000
          },
          {
            id: "",
            taskTitle: "Another Task",
            description: "Another Task Description",
            status: "Done",
            position: 2000
          },
          {
            id: "",
            taskTitle: "Yet Another Task",
            description: "Yet Another Task Description",
            status: "Done",
            position: 3000
          }
        ]
      },
      {
        id: "",
        title: "Marketing",
        position: 3000,
        phaseId: "",
        minorTasks: [
          {
            id: "",
            taskTitle: "A Task",
            description: "A Task Description",
            status: "Done",
            position: 1000
          },
          {
            id: "",
            taskTitle: "Another Task",
            description: "Another Task Description",
            status: "Done",
            position: 2000
          },
          {
            id: "",
            taskTitle: "Yet Another Task",
            description: "Yet Another Task Description",
            status: "Done",
            position: 3000
          }
        ]
      },
      {
        id: "",
        title: "Financial",
        position: 4000,
        phaseId: "",
        minorTasks: [
          {
            id: "",
            taskTitle: "A Task",
            description: "A Task Description",
            status: "Done",
            position: 1000
          },
          {
            id: "",
            taskTitle: "Another Task",
            description: "Another Task Description",
            status: "Done",
            position: 2000
          },
          {
            id: "",
            taskTitle: "Yet Another Task",
            description: "Yet Another Task Description",
            status: "Done",
            position: 3000
          }
        ]
      }
    ]
  };

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
    return new BehaviorSubject<boolean>(true).asObservable();
  }

  getPhaseDetail(id: string): Observable<any> {
    return new BehaviorSubject<PhaseFullInfo>(this.phase).asObservable();
    // return this.http.get<PhaseFullInfo>(this.applicationConfigService.getEndpointFor(`/api/phase/${id}`));
  }
}
