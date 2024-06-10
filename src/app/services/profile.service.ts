import { Injectable } from '@angular/core';
import { Account } from '../core/auth/account.model';
import { AccountProfile } from '../../shared/models/profile/profileDetail.model';
import { FullProfileDetail } from '../../shared/models/profile/fullProfileDetail.model';
import { ApplicationConfigService } from '../core/config/application-config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private appConfigService: ApplicationConfigService,
    private http: HttpClient
  ) {}

  mapToFullProfileDetail(account: Account, accountProfile: AccountProfile): FullProfileDetail {
    return {
      authorities: account.authorities,
      email: account.email,
      fullName: account.fullName,
      bio: account.bio,
      profilePicture: account.profilePicture,
      phoneNumber: accountProfile.phoneNumber,
      content: accountProfile.content,
      coverPhoto: accountProfile.coverPhoto,
    };
  }

  getProfile(): Observable<AccountProfile> {
    return this.http.get<AccountProfile>(this.appConfigService.getEndpointFor('/api/full-profile'));
  }
}
