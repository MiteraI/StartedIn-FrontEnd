import { Component, Input } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ProjectBasicInfo } from '../../../../shared/models/project/project-basic-info.model';

@Component({
  selector: 'app-project-side-nav-item',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './project-side-nav-item.component.html',
  styleUrl: './project-side-nav-item.component.css',
})
export class ProjectSideNavItemComponent {
  @Input({ required: true }) project: ProjectBasicInfo | null = null;
}
