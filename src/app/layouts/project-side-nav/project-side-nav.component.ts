import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
  @Input() opened = true;

  toggle() {
    this.opened = !this.opened;
  }
}
