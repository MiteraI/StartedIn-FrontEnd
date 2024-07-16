import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, first, of } from 'rxjs';
import { ProjectService } from '../../app/services/project.service';
import { PhaseFullInfo } from '../models/project/phase-full-info.model';

export const phaseDetailResolver: ResolveFn<PhaseFullInfo | null> = (route, state) => {
  const projectService = inject(ProjectService);

  return projectService.getPhaseDetail(route.params['id']).pipe(
    first(),
    catchError(error => {
      return of(null);
    })
  );
};
