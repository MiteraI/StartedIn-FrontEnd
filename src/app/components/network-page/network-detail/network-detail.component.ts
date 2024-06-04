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
      backgroundImage:
        'https://img.freepik.com/free-photo/gradient-dark-blue-futuristic-digital-background_53876-160646.jpg?w=1380&t=st=1717306890~exp=1717307490~hmac=a676596a0d8dce4d7b9f3ee380d74a07e547d990bc93898763d6300420e7663d',
      name: 'John Doe',
      detail: 'Software Engineer',
      numberConnections: 500,
    };
    this.profiles = new Array<Profile>(12).fill(profile, 0, 12);
    console.log(this.profiles);
  }
}
