import { HttpClient } from '@angular/common/http';
import { StateStorageService } from './state-storage.service';
import { ApplicationConfigService } from '../config/application-config.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from './account.model';
import { BehaviorSubject, Observable, catchError, of, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private account: Account | null = null;
  private accountSubject$ = new BehaviorSubject<Account | null>(this.account);

  constructor(
    private http: HttpClient,
    private applicationConfigService: ApplicationConfigService
  ) {}

  get isAuthenticated(): boolean {
    return this.account !== null;
  }

  get identity(): Observable<Account | null> {
    this.fetch().pipe(
      tap((account: Account) => {
        this.authenticate(account);
      })
    );

    return this.accountSubject$.pipe(catchError(() => of(null)));
  }

  authenticate(account: Account) {
    this.account = account;
    this.accountSubject$.next(account);
  }

  private fetch(): Observable<Account> {
    return this.http.get<Account>(this.applicationConfigService.getEndpointFor('/api/account'));
  }
}
