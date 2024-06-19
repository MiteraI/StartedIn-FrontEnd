import { Routes } from '@angular/router';
import { DefaultHomeGuard } from '../shared/guards/defaulthome.guard';
import { AuthenticatedGuard } from '../shared/guards/authenticated.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [DefaultHomeGuard],
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
    canActivate: [DefaultHomeGuard],
    loadComponent: () =>
      import('./pages/landing-page/landing-page.component').then(c => c.LandingPageComponent),
    title: 'StartedIn - Phát Triển Startups',
  },
  {
    path: 'about-us',
    loadComponent: () =>
      import('./pages/about-us-page/about-us.component').then(c => c.AboutUsComponent),
    title: 'Về chúng tôi',
  },
  {
    path: 'feed',
    canActivate: [AuthenticatedGuard],
    loadComponent: () =>
      import('./pages/post-list-page/post-list.component').then(c => c.PostListComponent),
    title: 'Mạng xã hội',
  },
  {
    path: 'network',
    loadComponent: () =>
      import('./pages/network-page/network-page.component').then(c => c.NetworkPageComponent),
    title: 'Kết nối với người khác',
  },
  {
    path: 'team-member',
    loadComponent: () =>
      import('./pages/team-members/team-members.component').then(c => c.TeamMembersComponent),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile-page/profile-page.component').then(c => c.ProfilePageComponent),
  },
  {
    path: 'startup/1',
    loadComponent: () =>
      import('./pages/phase-list-page/phase-list-page.component').then(c => c.PhaseListPageComponent),
    title: "StartedIn"
  }
];
