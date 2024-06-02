import { Component } from '@angular/core';
import { Profile } from '../../../../shared/models/network-profile.model';
import { NetworkProfileCardComponent } from '../network-profile-card/network-profile-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-network-detail',
  standalone: true,
  imports: [NetworkProfileCardComponent, CommonModule],
  templateUrl: './network-detail.component.html',
  styleUrl: './network-detail.component.css',
})
export class NetworkDetailComponent {
  profiles: Profile[] = [];
  constructor() {
    const profile: Profile = {
      image: 'https://randomuser.me/api/portraits/men/79.jpg',
      name: 'John Doe',
      detail: 'Software Engineer',
      numberConnections: 500,
    };
    this.profiles = new Array<Profile>(12).fill(profile, 0, 12);
    console.log(this.profiles);
  }
}
