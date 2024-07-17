import { HttpClient } from "@angular/common/http";
import { ApplicationConfigService } from "../core/config/application-config.service";
import { Injectable } from "@angular/core";
import { MajorTaskCreateModel } from "../../shared/models/task/major-task-create.model";
import { Observable } from "rxjs";
import { CreatedResponse } from "../../shared/models/created-response.model";
import { MajorTaskMoveModel } from "../../shared/models/task/major-task-move.model";
import { TaskboardMoveModel } from "../../shared/models/task/taskboard-move.model";
import { MinorTaskMoveModel } from "../../shared/models/task/minor-task-move.model";
import { TaskboardCreateModel } from "../../shared/models/task/taskboard-create.model";
import { MinorTaskCreateModel } from "../../shared/models/task/minor-task-create.model";

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(
    private http: HttpClient,
    private applicationConfigService: ApplicationConfigService
  ) {}

  createMajorTask(task: MajorTaskCreateModel): Observable<any> {
    return this.http.post<CreatedResponse>(this.applicationConfigService.getEndpointFor('/api/majortask/create'), task);
  }

  createTaskboard(taskboard: TaskboardCreateModel): Observable<any> {
    return this.http.post<CreatedResponse>(this.applicationConfigService.getEndpointFor('/api/taskboard/create'), taskboard);
  }

  createMinorTask(task: MinorTaskCreateModel): Observable<any> {
    return this.http.post<CreatedResponse>(this.applicationConfigService.getEndpointFor('/api/minortask/create'), task);
  }

  moveMajorTask(movement: MajorTaskMoveModel): Observable<any> {
    return this.http.put(this.applicationConfigService.getEndpointFor('/api/majortask/move'), movement);
  }

  moveTaskboard(movement: TaskboardMoveModel): Observable<any> {
    return this.http.put(this.applicationConfigService.getEndpointFor('/api/taskboard/move'), movement);
  }

  moveMinorTask(movement: MinorTaskMoveModel): Observable<any> {
    return this.http.put(this.applicationConfigService.getEndpointFor('/api/minortask/move'), movement);
  }
}
