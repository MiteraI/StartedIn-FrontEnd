import { HttpClient } from '@angular/common/http';
import { ApplicationConfigService } from '../core/config/application-config.service';
import { Injectable } from '@angular/core';
import { MajorTaskCreateModel } from '../../shared/models/task/major-task-create.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { CreatedResponse } from '../../shared/models/created-response.model';
import { MajorTaskMoveModel } from '../../shared/models/task/major-task-move.model';
import { MajorTaskDialogInfo } from '../../shared/models/task/major-task-dialog-info.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
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

  moveMajorTask(movement: MajorTaskMoveModel): Observable<any> {
    return new BehaviorSubject<boolean>(true).asObservable();
  }

  getMajorTaskById(id: string): Observable<any> {
    return this.http.get<MajorTaskDialogInfo>(
      this.applicationConfigService.getEndpointFor(`/api/majortask/${id}`)
    );
  }
}
