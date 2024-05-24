import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth-pages/login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login'
  }
];
