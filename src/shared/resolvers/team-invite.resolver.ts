import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { TeamService } from '../../app/services/team.service';
import { TeamInviteView } from '../models/project/team/team-invite-view.model';
import { catchError, first, of } from 'rxjs';

export const teamInviteResolver: ResolveFn<TeamInviteView | null> = (route, state) => {
  const teamService = inject(TeamService);

  return teamService.viewTeamById(route.params['id']).pipe(
    first(),
    catchError(error => {
      return of(null);
    })
  );
};
