import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogContent } from '@angular/material/dialog';
import { AuthJwtService } from '../../core/auth/auth-jwt.service';
import { AccountService } from '../../core/auth/account.service';
import { Router } from '@angular/router';

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
    private accountService: AccountService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(): void {
    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: () => {
        this.authenticationError = false;
        if (!this.router.getCurrentNavigation()) {
          this.router.navigate(['']).then(() => {
            window.location.reload();
          });
        }
      },
      error: () => (this.authenticationError = true),
    });
  }
}