import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StateStorageService } from './state-storage.service';
import { ApplicationConfigService } from '../config/application-config.service';
import { Observable, map } from 'rxjs';
import { Login } from '../../../shared/models/login.model';


type Token = {
  accessToken: string;
  refreshToken: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthJwtService {
  constructor(
    private http: HttpClient,
    private stateStorage: StateStorageService,
    private applicationConfig: ApplicationConfigService
  ) {}

  login(credentials: Login): Observable<void> {
    return this.http
      .post<Token>(this.applicationConfig.getEndpointFor('/api/authenticate'), credentials)
      .pipe(map(response => this.authenticateSuccess(response)));
  }

  private authenticateSuccess(response: Token): void {
    console.log(response);
  }
}
