import { Component } from '@angular/core';
import { Team } from '../../../../shared/models/network-team.model';
import { Profile } from '../../../../shared/models/network-profile.model';
import { CommonModule } from '@angular/common';
import { TeamCardComponent } from '../team-card/team-card.component';

@Component({
  selector: 'app-team-detail',
  standalone: true,
  imports: [CommonModule, TeamCardComponent],
  templateUrl: './team-detail.component.html',
  styleUrl: './team-detail.component.css',
})
export class TeamDetailComponent {
  teams: Team[] = [];
  constructor() {
    this.mockData();
  }

  mockData() {

    const team1: Team = {
      teamName: 'Startedin',
      profiles: [
        {
          image: 'https://randomuser.me/api/portraits/men/79.jpg',
          backgroundImage: 'https://randomuser.me/api/portraits/men/79.jpg',
          name: 'Alice Johnson',
          detail: 'UI/UX Designer with 8 years of experience',
          numberConnections: 300,
        },
        {
          image: 'https://randomuser.me/api/portraits/men/79.jpg',
          backgroundImage: 'https://randomuser.me/api/portraits/men/79.jpg',
          name: 'Bob Brown',
          detail: 'Graphic Designer and Illustrator',
          numberConnections: 180,
        },
      ],
    };

    this.teams.push(team1, team1);
    console.log(this.teams);
  }
}
