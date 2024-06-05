import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';
import { ApplicationConfigService } from '../../../core/config/application-config.service';
import { RegisterRequest } from '../../../../shared/models/register-request.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  message: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private appConfigService: ApplicationConfigService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmedPassword: ['', Validators.required],
        fullName: ['', Validators.required],
        phoneNumber: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('confirmedPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const registerData: RegisterRequest = this.registerForm.getRawValue();
      this.register(registerData).subscribe();
    } else {
      this.snackBar.open('Vui lòng điền tất các thông tin', 'Close  ', {
        duration: 3000,
      });
    } 
  }

  register(registerData: RegisterRequest): Observable<any> {
    return this.http.post(this.appConfigService.getEndpointFor('/api/register'), registerData, { responseType: 'text' }).pipe(
      tap((response: string) => {
        this.snackBar.open(response, 'Close', { duration: 3000 });
        this.router.navigate(['/login']);
      }),
      catchError((error) => {
        this.snackBar.open(error.error.message, 'Close', { duration: 3000 });
        return throwError(error);
      })
    );
  }
}
