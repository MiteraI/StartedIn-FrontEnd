import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from '../core/config/application-config.service';
import { MinorTaskMoveModel } from '../../shared/models/task/minor-task-move.model';
import { CreatedResponse } from '../../shared/models/created-response.model';
import { MinorTaskCreateModel } from '../../shared/models/task/minor-task-create.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MinorTaskService {
  constructor(
    private http: HttpClient,
    private applicationConfigService: ApplicationConfigService
  ) {}

  createMinorTask(task: MinorTaskCreateModel): Observable<any> {
    return this.http.post<CreatedResponse>(
      this.applicationConfigService.getEndpointFor('/api/minortask/create'),
      task
    );
  }

  moveMinorTask(movement: MinorTaskMoveModel): Observable<any> {
    return this.http.put(
      this.applicationConfigService.getEndpointFor('/api/minortask/move'),
      movement
    );
  }
}
