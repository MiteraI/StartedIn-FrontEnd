import { Routes } from '@angular/router';
import { TeamPageComponent } from './team-page.component';
import { projectDetailResolver } from '../../../../shared/resolvers/project-detail.resolver';
import { phaseDetailResolver } from '../../../../shared/resolvers/phase-detail.resolver';

export const routes: Routes = [
  {
    path: '',
    component: TeamPageComponent,
    children: [
      {
        path: 'projects/:id',
        resolve: { project: projectDetailResolver },
        loadComponent: () =>
          import('../phase-list-page/phase-list-page.component').then(
            c => c.PhaseListPageComponent
          ),
      },
      {
        path: 'phases/:id',
        resolve: { phase: phaseDetailResolver },
        loadComponent: () =>
          import('../phase-detail-page/phase-detail-page.component').then(
            c => c.PhaseDetailPageComponent
          ),
      },
    ],
  },
];
