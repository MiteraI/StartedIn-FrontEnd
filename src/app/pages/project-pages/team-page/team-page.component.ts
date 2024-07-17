import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterOutlet } from '@angular/router';
import { ProjectSideNavComponent } from '../../../layouts/project-side-nav/project-side-nav.component';

@Component({
  selector: 'app-team-page',
  standalone: true,
  imports: [RouterOutlet, ProjectSideNavComponent],
  templateUrl: './team-page.component.html',
  styleUrl: './team-page.component.css',
})
export class TeamPageComponent {
  teamId: string | null = null;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.teamId = params.get('teamId');
    });
  }
}
