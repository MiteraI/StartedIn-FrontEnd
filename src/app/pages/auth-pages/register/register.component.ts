import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';

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
      const { email, password, confirmedPassword, fullName, phoneNumber } =
        this.registerForm.getRawValue();
      this.register({ email, password, confirmedPassword, fullName, phoneNumber }).subscribe(
        () => {
          this.snackBar.open('Tạo tài khoản thành công', 'OK', {
            duration: 3000,
          });
          this.router.navigate(['/login']);
        },
        error => {
          this.snackBar.open('Tạo tài khoản thất bại: ' + error.message, 'OK', {
            duration: 3000,
          });
        }
      );
    } else {
      this.snackBar.open('Vui lòng điền tất các thông tin', 'OK', {
        duration: 3000,
      });
    }
  }

  register(user: any): Observable<any> {
    const apiUrl = 'https://startedin-21a210f33eba.herokuapp.com/api/register';
    console.log('Registering user:', user);
    return this.http.post<any>(apiUrl, user).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('API call error: ', error);
        throw error;
      })
    );
  }
}
