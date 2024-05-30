import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StateStorageService } from './state-storage.service';
import { ApplicationConfigService } from '../config/application-config.service';
import { Observable, catchError, map, throwError } from 'rxjs';
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
      .post<Token>(this.applicationConfig.getEndpointFor('/api/login'), credentials)
      .pipe(map(response => this.authenticateSuccess(response)));
  }

  refreshAccess() {
    const token: Token = {
      refreshToken: this.stateStorage.getRefreshToken(),
      accessToken: '',
    };
    return this.http
      .post<Token>(this.applicationConfig.getEndpointFor('/api/refresh-token'), token)
      .pipe(
        map(response => this.authenticateSuccess(response)),
        catchError(this.handleError)
      );
  }

  private authenticateSuccess(response: Token): void {
    this.stateStorage.storeAuthenticationToken(response.accessToken, response.refreshToken);
  }

  // Will put this somewhere else to be used globally
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }

    return throwError(() => error);
  }
}
