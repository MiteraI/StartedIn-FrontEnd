import { ResolveFn } from '@angular/router';
import { AccountProfile } from '../models/profile/profileDetail.model';
import { NetworkService } from '../../app/services/network.service';
import { inject } from '@angular/core';
import { catchError, first, of } from 'rxjs';

export const platformUserProfileResolver: ResolveFn<AccountProfile | null> = (route, state) => {
  const networkService = inject(NetworkService);

  return networkService.getPlatformUserProfile(route.params['id']).pipe(
    first(),
    catchError(error => {
      return of(null);
    })
  );
};
