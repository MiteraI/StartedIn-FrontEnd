import { Component } from '@angular/core';
import { ProfileDetailComponent } from '../../components/profile-page/profile-detail/profile-detail.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ProfileDetailComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent {}
