import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from '../core/config/application-config.service';
import { Observable, catchError, of } from 'rxjs';
import { ConnectedUser, ReceiveInvitaion } from '../../shared/models/invitation.model';
import { AccountProfile } from '../../shared/models/profile/profileDetail.model';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  constructor(
    private http: HttpClient,
    private appConfigService: ApplicationConfigService
  ) {}

  getNetworkProfiles(pageIndex: number = 1, pageSize: number = 10): Observable<any> {
    const query = `pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return this.http.get<any>(
      this.appConfigService.getEndpointFor(`/api/users/suggest-connection?${query}`)
    );
  }

  connectProfile(profileId: string): Observable<any> {
    return this.http.post<any>(
      this.appConfigService.getEndpointFor(`/api/connect/${profileId}`),
      '',
      {
        responseType: 'text' as 'json',
      }
    );
  }

  getReceivedInvitations(pageIndex: number = 1, pageSize: number = 10): Observable<any> {
    const query = `pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return this.http.get<ReceiveInvitaion[]>(
      this.appConfigService.getEndpointFor(
        `/api/connect/pending-connection-receiving-request?${query}`
      )
    );
  }

  getSentInvitations(pageIndex: number = 1, pageSize: number = 10): Observable<any> {
    const query = `pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return this.http.get<ReceiveInvitaion[]>(
      this.appConfigService.getEndpointFor(
        `/api/connect/pending-connection-sending-request?${query}`
      )
    );
  }

  getPlatformUserProfile(userId: string): Observable<AccountProfile | null> {
    return this.http
      .get<AccountProfile>(this.appConfigService.getEndpointFor(`/api/users/${userId}`))
      .pipe(
        catchError(error => {
          console.error(`Error fetching user profile ${userId}`, error);
          return of(null);
        })
      );
  }

  accpetInvitation(invitationId: string): Observable<any> {
    return this.http.put<any>(
      this.appConfigService.getEndpointFor(`/api/connect/${invitationId}`),
      '',
      {
        responseType: 'text' as 'json',
      }
    );
  }

  declineInvitation(invitationId: string): Observable<any> {
    return this.http.delete<any>(
      this.appConfigService.getEndpointFor(`/api/connect/${invitationId}`),
      {
        responseType: 'text' as 'json',
      }
    );
  }

  getUserConnectionList(pageIndex: number = 1, pageSize: number = 10): Observable<any> {
    const query = `pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return this.http.get<ConnectedUser>(
      this.appConfigService.getEndpointFor(`/api/connect/user-connection-list?${query}`)
    );
  }
}
