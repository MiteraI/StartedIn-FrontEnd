import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-network-left-sidebar',
  standalone: true,
  imports: [MatIconModule, RouterModule],
  templateUrl: './network-left-sidebar.component.html',
  styleUrl: './network-left-sidebar.component.css',
})
export class NetworkLeftSidebarComponent {}
