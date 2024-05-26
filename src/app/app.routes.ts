import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth-pages/login/login.component').then(c => c.LoginComponent),
    title: 'Đăng nhập vào StartedIn',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/auth-pages/register/register.component').then(c => c.RegisterComponent),
    title: 'Đăng ký vào StartedIn',
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing-page/landing-page.component').then(c => c.LandingPageComponent),
    title: 'StartedIn - Phát Triển Startups',
  },
];
