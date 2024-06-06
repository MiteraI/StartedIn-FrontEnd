import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogContent } from '@angular/material/dialog';
import { AuthJwtService } from '../../core/auth/auth-jwt.service';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-window',
  standalone: true,
  imports: [MatDialogContent, ReactiveFormsModule],
  templateUrl: './login-window.component.html',
  styleUrl: './login-window.component.css',
})
export class LoginWindowComponent {
  public loginForm: FormGroup;
  authenticationError = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthJwtService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(): void {
    this.authService
      .login(this.loginForm.getRawValue())
      .pipe(
        tap((response: any) => {
          this.authenticationError = false;
          if (!this.router.getCurrentNavigation()) {
            this.router.navigate(['/']);
            location.reload();
          }
        }),
        catchError(error => {
          this.snackBar.open(error.error, 'Close', { duration: 3000 });
          return throwError(error);
        })
      )
      .subscribe();
  }
}
