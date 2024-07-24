import { Injectable } from '@angular/core';
import { AccountProfile } from '../../shared/models/profile/profileDetail.model';
import { ApplicationConfigService } from '../core/config/application-config.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { EditProfile } from '../../shared/models/profile/editProfile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private appConfigService: ApplicationConfigService,
    private http: HttpClient
  ) {}

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  mapToEditProfile(profile: AccountProfile): EditProfile {
    return {
      bio: profile.bio,
      phoneNumber: profile.phoneNumber,
    };
  }

  getProfile(): Observable<AccountProfile> {
    return this.http.get<AccountProfile>(this.appConfigService.getEndpointFor('/api/full-profile'));
  }

  edit(editData: EditProfile): Observable<any> {
    return this.http.put(this.appConfigService.getEndpointFor('/api/profile/edit'), editData).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  uploadProfileImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('avatar', file);
    return this.http
      .post(this.appConfigService.getEndpointFor('/api/profile/avatar'), formData)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  uploadCoverPhoto(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('coverPhoto', file);
    return this.http
      .post(this.appConfigService.getEndpointFor('/api/profile/cover-photo'), formData)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }
}
