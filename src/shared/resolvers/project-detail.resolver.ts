import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, first, of } from 'rxjs';
import { ProjectFullInfo } from '../models/project/project-full-info.model';
import { ProjectService } from '../../app/services/project.service';

export const projectDetailResolver: ResolveFn<ProjectFullInfo | null> = (route, state) => {
  const projectService = inject(ProjectService);

  return projectService.getProject(route.params['id']).pipe(
    first(),
    catchError(error => {
      return of(null);
    })
  );
};
