import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Profile } from '../../../../shared/models/network-profile.model';

@Component({
  selector: 'app-network-profile-card',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './network-profile-card.component.html',
  styleUrl: './network-profile-card.component.css',
})
export class NetworkProfileCardComponent {
  @Input() profile!: Profile;
}
