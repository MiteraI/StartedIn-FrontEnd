import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { AccountProfile } from '../models/profile/profileDetail.model';
import { ProfileService } from '../../app/services/profile.service';
import { catchError, first, of } from 'rxjs';

export const currentUserProfileResolver: ResolveFn<AccountProfile | null> = (route, state) => {
  const profileService = inject(ProfileService);

  return profileService.getProfile().pipe(
    first(),
    catchError(error => {
      return of(null);
    })
  );
};
