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
    leader: {
      id: "1",
      fullName: "Nguyen Do Cao Linh",
      email: "a@b.com",
      profilePicture: "",
    },
    phases: [
      {
        id: "Phase1",
        phaseName: "Ideation Phase",
        position: 1000,
        majorTasks: [
          {
            id: "T1",
            taskTitle: "A Task",
            description: "A Task",
            position: 1000
          },
          {
            id: "T2",
            taskTitle: "Another Task",
            description: "Another Taskaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            position: 2000
          },
          {
            id: "T3",
            taskTitle: "Yet Another Task",
            description: "",
            position: 3000
          }
        ]
      },
      {
        id: "Phase2",
        phaseName: "Fundraising Phase",
        position: 1000,
        majorTasks: [
          {
            id: "T1",
            taskTitle: "A Task",
            description: "A Task",
            position: 1000
          },
          {
            id: "T2",
            taskTitle: "Another Task",
            description: "Another Task",
            position: 2000
          },
          {
            id: "T3",
            taskTitle: "Yet Another Task",
            description: "Yet Another Task",
            position: 3000
          }
        ]
      },
      {
        id: "Phase1",
        phaseName: "Development Phase",
        position: 1000,
        majorTasks: [
          {
            id: "T1",
            taskTitle: "A Task",
            description: "A Task",
            position: 1000
          },
          {
            id: "T2",
            taskTitle: "Another Task",
            description: "Another Task",
            position: 2000
          },
          {
            id: "T3",
            taskTitle: "Yet Another Task",
            description: "Yet Another Task",
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
