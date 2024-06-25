import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'project-side-nav',
  standalone: true,
  imports: [MatSidenavModule, CommonModule, MatIconModule],
  templateUrl: './project-side-nav.component.html',
  styleUrl: './project-side-nav.component.css'
})
export class ProjectSideNavComponent {
  opened = false;

  toggle() {
    this.opened = !this.opened;
  }
}
