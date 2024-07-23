import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from '../core/config/application-config.service';
import { TaskboardCreateModel } from '../../shared/models/task/taskboard-create.model';
import { CreatedResponse } from '../../shared/models/created-response.model';
import { Observable } from 'rxjs';
import { TaskboardMoveModel } from '../../shared/models/task/taskboard-move.model';

@Injectable({
  providedIn: 'root',
})
export class TaskBoardService {
  constructor(
    private http: HttpClient,
    private applicationConfigService: ApplicationConfigService
  ) {}

  createTaskboard(taskboard: TaskboardCreateModel): Observable<any> {
    return this.http.post<CreatedResponse>(
      this.applicationConfigService.getEndpointFor('/api/taskboard/create'),
      taskboard
    );
  }

  moveTaskboard(movement: TaskboardMoveModel): Observable<any> {
    return this.http.put(
      this.applicationConfigService.getEndpointFor('/api/taskboard/move'),
      movement
    );
  }

  editTaskboard(title: string, id: string): Observable<any> {
    return this.http.put(
      this.applicationConfigService.getEndpointFor(`/api/taskboard/edit/${id}`),
      { title: title }
    );
  }
}
