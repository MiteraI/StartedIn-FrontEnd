import { Component } from '@angular/core';
import { NetworkDetailComponent } from '../../components/network-page/network-detail/network-detail.component';
import { NetworkLeftSidebarComponent } from '../../components/network-page/network-left-sidebar/network-left-sidebar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-network-page',
  standalone: true,
  imports: [NetworkDetailComponent, NetworkLeftSidebarComponent,RouterModule],
  templateUrl: './network-page.component.html',
  styleUrl: './network-page.component.css',
})
export class NetworkPageComponent {}
