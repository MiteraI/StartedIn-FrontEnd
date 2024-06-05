import { Component } from '@angular/core';
import { NetworkLeftSidebarComponent } from '../../components/network-page/network-left-sidebar/network-left-sidebar.component';
import { TeamDetailComponent } from '../../components/network-page/team-detail/team-detail.component';

@Component({
  selector: 'app-team-members',
  standalone: true,
  imports: [NetworkLeftSidebarComponent, TeamDetailComponent],
  templateUrl: './team-members.component.html',
  styleUrl: './team-members.component.css'
})
export class TeamMembersComponent {

}
