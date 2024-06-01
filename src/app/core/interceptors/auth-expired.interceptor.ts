import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, flatMap, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { StateStorageService } from '../auth/state-storage.service';
import { AccountService } from '../auth/account.service';
import { AuthJwtService, Token } from '../auth/auth-jwt.service';

@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {
  private isRefreshingToken = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(
    private router: Router,
    // private accountService: AccountService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            const isTokenExpired = error.headers.get('is-token-expired') === 'true';
            // if (isTokenExpired || this.accountService.isAuthenticated$) {
            //   return this.handleUnauthorizedError(request, next);
            // }
          }
        }
        return throwError(error);
      })
    );
  }

//   private handleUnauthorizedError(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     if (!this.isRefreshingToken) {
//       this.isRefreshingToken = true;
//       this.refreshTokenSubject.next(null);

//       return this.accountService.authJwt.refreshAccess().pipe(
//         switchMap((response) => {
//           this.isRefreshingToken = false;
//           this.refreshTokenSubject.next(response.accessToken);
//           return this.retryRequest(request, next);
//         }),
//         catchError(error => {
//           this.isRefreshingToken = false;
//           this.accountService.logout();
//           this.router.navigate(['/login']);
//           return throwError(error);
//         })
//       );
//     }

//     return this.refreshTokenSubject.pipe(
//       filter(accessToken => accessToken !== null),
//       flatMap(() => this.retryRequest(request, next))
//     );
//   }

  private retryRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request);
  }
}
