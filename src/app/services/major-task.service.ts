import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from '../core/config/application-config.service';
import { MajorTaskCreateModel } from '../../shared/models/task/major-task-create.model';
import { CreatedResponse } from '../../shared/models/created-response.model';
import { Observable } from 'rxjs';
import { MajorTaskMoveModel } from '../../shared/models/task/major-task-move.model';
import { MajorTaskEditModel } from '../../shared/models/task/major-task-edit.model';
import { MinorTask } from '../../shared/models/task/minor-task.model';
import { MajorTaskDialogInfo } from '../../shared/models/task/major-task-dialog-info.model';

@Injectable({
  providedIn: 'root',
})
export class MajorTaskService {
  constructor(
    private http: HttpClient,
    private applicationConfigService: ApplicationConfigService
  ) {}

  createMajorTask(task: MajorTaskCreateModel): Observable<any> {
    return this.http.post<CreatedResponse>(
      this.applicationConfigService.getEndpointFor('/api/majortask/create'),
      task
    );
  }

  getMajorTaskById(id: string): Observable<any> {
    return this.http.get<MajorTaskDialogInfo>(
      this.applicationConfigService.getEndpointFor(`/api/majortask/${id}`)
    );
  }

  moveMajorTask(movement: MajorTaskMoveModel): Observable<any> {
    return this.http.put(
      this.applicationConfigService.getEndpointFor('/api/majortask/move'),
      movement
    );
  }

  editMajorTask(id: string, task: MajorTaskEditModel): Observable<any> {
    return this.http.put(
      this.applicationConfigService.getEndpointFor(`/api/majortask/edit/${id}`),
      task
    );
  }

  getAssignableMajorTasks(id: string): Observable<any> {
    return this.http.get<MinorTask[]>(this.applicationConfigService.getEndpointFor(`/api/majortask/${id}/get-assignable-minor-tasks`));
  }
}
