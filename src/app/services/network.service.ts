import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from '../core/config/application-config.service';
import { Observable } from 'rxjs';
import { ReceiveInvitaion } from '../../shared/models/invitation.model';

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
}
