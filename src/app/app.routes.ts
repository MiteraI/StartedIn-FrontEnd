import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth-pages/login/login.component').then(c => c.LoginComponent),
    title: 'Login',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/auth-pages/register/register.component').then(c => c.RegisterComponent),
    title: 'Register',
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing-page/landing-page.component').then(c => c.LandingPageComponent),
    title: 'Register',
  },
];
