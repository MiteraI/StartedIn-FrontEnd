import { HttpClient } from "@angular/common/http";
import { ApplicationConfigService } from "../core/config/application-config.service";
import { Injectable } from "@angular/core";
import { MajorTaskCreateModel } from "../../shared/models/task/major-task-create.model";
import { Observable } from "rxjs";
import { CreatedResponse } from "../../shared/models/created-response.model";

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
}
