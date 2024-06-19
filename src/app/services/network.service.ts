import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from '../core/config/application-config.service';
import { Observable } from 'rxjs';

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
    return this.http.get<any>(this.appConfigService.getEndpointFor(`/api/users?${query}`));
  }
}
