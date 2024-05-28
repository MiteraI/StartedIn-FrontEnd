import { HttpClient } from '@angular/common/http';
import { StateStorageService } from './state-storage.service';
import { ApplicationConfigService } from '../config/application-config.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private stateStorageService: StateStorageService,
    private applicationConfigService: ApplicationConfigService
  ) {}
}
