import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of, take } from 'rxjs';
import { AccountService } from '../../app/core/auth/account.service';
import { StateStorageService } from '../../app/core/auth/state-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard implements CanActivate {
  isAuthenticated = true;

  constructor(
    private stateStorage: StateStorageService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (!this.stateStorage.getRefreshToken()) {
      this.router.navigate(['/login']);
      return of(false);
    } else {
      return of(true);
    }
  }
}
