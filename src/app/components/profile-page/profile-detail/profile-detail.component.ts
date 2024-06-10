import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FullProfileDetail } from '../../../../shared/models/profile/fullProfileDetail.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-detail',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './profile-detail.component.html',
  styleUrl: './profile-detail.component.css'
})
export class ProfileDetailComponent {
  @Input() account: FullProfileDetail | null = null;
}
