import { Routes } from '@angular/router';
import { DefaultHomeGuard } from '../shared/guards/defaulthome.guard';
import { AuthenticatedGuard } from '../shared/guards/authenticated.guard';
import { platformUserProfileResolver } from '../shared/resolvers/platform-user-profile.resolver';

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
    canActivate: [AuthenticatedGuard],
    loadComponent: () =>
      import('./pages/network-page/network-page.component').then(c => c.NetworkPageComponent),
    title: 'Kết nối với người khác',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/network-page/network-detail/network-detail.component').then(
            c => c.NetworkDetailComponent
          ),
      },
      {
        path: 'friends',
        loadComponent: () =>
          import('./components/network-page/friend-management/friend-management.component').then(
            c => c.FriendManagementComponent
          ),
      },
      {
        path: 'team-member',
        loadComponent: () =>
          import('./components/network-page/team-detail/team-detail.component').then(
            c => c.TeamDetailComponent
          ),
      },
      {
        path: 'invitation',
        loadComponent: () =>
          import(
            './components/network-page/invitation-management/invitation-management.component'
          ).then(c => c.InvitationManagementComponent),
        title: 'Quản lý lời mời',
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './components/network-page/invitation-management/received-invitation/received-invitation.component'
              ).then(c => c.ReceivedInvitationComponent),
          },
          {
            path: 'sent',
            loadComponent: () =>
              import(
                './components/network-page/invitation-management/sent-invitation/sent-invitation.component'
              ).then(c => c.SentInvitationComponent),
          },
        ],
      },
    ],
  },
  {
    path: 'profile',
    canActivate: [AuthenticatedGuard],
    loadComponent: () =>
      import('./pages/profile-page/profile-page.component').then(c => c.ProfilePageComponent),
  },
  {
    path: 'profile/:id',
    resolve: { account: platformUserProfileResolver },
    loadComponent: () =>
      import(
        './pages/network-page/platform-user-profile-page/platform-user-profile-page.component'
      ).then(c => c.PlatformUserProfilePageComponent),
  },
  {
    path: 'startup/1',
    loadComponent: () =>
      import('./pages/phase-list-page/phase-list-page.component').then(
        c => c.PhaseListPageComponent
      ),
    title: 'StartedIn',
  },
  {
    path: 'phase/1',
    loadComponent: () =>
      import('./pages/phase-detail-page/phase-detail-page.component').then(
        c => c.PhaseDetailPageComponent
      ),
    title: 'Idea Phase',
  },
];
