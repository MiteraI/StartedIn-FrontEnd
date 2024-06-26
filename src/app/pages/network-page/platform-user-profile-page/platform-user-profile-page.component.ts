import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountProfile } from '../../../../shared/models/profile/profileDetail.model';
import { MatIconModule } from '@angular/material/icon';
import { ConnectButtonComponent } from '../../../components/network-page/connect-button/connect-button.component';

@Component({
  selector: 'app-platform-user-profile-page',
  standalone: true,
  imports: [MatIconModule, ConnectButtonComponent],
  templateUrl: './platform-user-profile-page.component.html',
  styleUrl: './platform-user-profile-page.component.css',
})
export class PlatformUserProfilePageComponent implements OnInit {
  account: AccountProfile | null = null;
  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activeRoute.data.subscribe(data => {
      this.account = data['account'];
      console.log('Account profile:', this.account);
    });
  }
}
