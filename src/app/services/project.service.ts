import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApplicationConfigService } from "../core/config/application-config.service";
import { BehaviorSubject, Observable } from "rxjs";
import { ProjectFullInfo } from "../../shared/models/project/project-full-info.model";

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  project: ProjectFullInfo = {
    id: "Prj1",
    projectName: "CarGo",
    teamId: "CarGoTeam",
    creator: "Nguyen Do Cao Linh",
    phases: [
      {
        id: "Phase1",
        name: "Ideation Phase",
        position: 1000,
        tasks: [
          {
            id: "T1",
            name: "A Task",
            position: 1000
          },
          {
            id: "T2",
            name: "Another Task",
            position: 2000
          },
          {
            id: "T3",
            name: "Yet Another Task",
            position: 3000
          }
        ]
      },
      {
        id: "Phase1",
        name: "Fundraising Phase",
        position: 2000,
        tasks: [
          {
            id: "T1",
            name: "A Task",
            position: 1000
          },
          {
            id: "T2",
            name: "Another Task",
            position: 2000
          },
          {
            id: "T3",
            name: "Yet Another Task",
            position: 3000
          }
        ]
      },
      {
        id: "Phase1",
        name: "Development Phase",
        position: 3000,
        tasks: [
          {
            id: "T1",
            name: "A Task",
            position: 1000
          },
          {
            id: "T2",
            name: "Another Task",
            position: 2000
          },
          {
            id: "T3",
            name: "Yet Another Task",
            position: 3000
          }
        ]
      },
    ]
  }

  constructor(
    private http: HttpClient,
    private applicationConfigService: ApplicationConfigService
  ) {}

  getProject(id: string) : Observable<any> {
    return new BehaviorSubject<ProjectFullInfo>(this.project).asObservable();
  }
}
