import { Component } from '@angular/core';
import { NetworkLeftSidebarComponent } from '../../components/network-page/network-left-sidebar/network-left-sidebar.component';

@Component({
  selector: 'app-invitation-page',
  standalone: true,
  imports: [NetworkLeftSidebarComponent],
  templateUrl: './invitation-page.component.html',
  styleUrl: './invitation-page.component.css'
})
export class InvitationPageComponent {

}
