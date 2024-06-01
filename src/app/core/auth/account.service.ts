import { HttpClient } from '@angular/common/http';
import { StateStorageService } from './state-storage.service';
import { ApplicationConfigService } from '../config/application-config.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from './account.model';
import { BehaviorSubject, EMPTY, Observable, catchError, of, shareReplay, tap } from 'rxjs';
import { AuthJwtService } from './auth-jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private account: Account | null = null;
  private accountSubject$ = new BehaviorSubject<Account | null>(this.account);
  private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private stateStorage: StateStorageService,
    public authJwt: AuthJwtService,
    private applicationConfigService: ApplicationConfigService
  ) {
    if (stateStorage.getRefreshToken()) {
      authJwt
        .refreshAccess()
        .pipe(
          tap(() => this.identity().subscribe()),
          catchError(() => of(null))
        )
        .subscribe();
    }
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject$.asObservable();
  }

  identity(): Observable<Account | null> {
    return this.fetch().pipe(
      tap((account: Account) => {
        this.authenticate(account);
      }),
      catchError(() => EMPTY)
    );
  }

  authenticate(account: Account) {
    this.account = account;
    this.accountSubject$.next(account);
    this.isAuthenticatedSubject$.next(true);
  }

  logout() {
    this.account = null;
    this.accountSubject$.next(null);
    this.isAuthenticatedSubject$.next(false);
  }

  private fetch(): Observable<Account> {
    return this.http.get<Account>(this.applicationConfigService.getEndpointFor('/api/profile'));
  }
}
