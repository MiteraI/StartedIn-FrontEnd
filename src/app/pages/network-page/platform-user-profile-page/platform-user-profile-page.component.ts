import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountProfile } from '../../../../shared/models/profile/profileDetail.model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-platform-user-profile-page',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './platform-user-profile-page.component.html',
  styleUrl: './platform-user-profile-page.component.css',
})
export class PlatformUserProfilePageComponent implements OnInit {
  accountProfile: AccountProfile | null = null;
  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activeRoute.data.subscribe(data => {
      this.accountProfile = data['account'];
      console.log('Account profile:', this.accountProfile);
    });
  }
}
