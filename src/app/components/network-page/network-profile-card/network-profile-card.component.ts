import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AccountProfile } from '../../../../shared/models/profile/profileDetail.model';
import { ConnectButtonComponent } from '../connect-button/connect-button.component';

@Component({
  selector: 'app-network-profile-card',
  standalone: true,
  imports: [MatIcon, ConnectButtonComponent],
  templateUrl: './network-profile-card.component.html',
  styleUrl: './network-profile-card.component.css',
})
export class NetworkProfileCardComponent {
  @Input() profile!: AccountProfile;

}
