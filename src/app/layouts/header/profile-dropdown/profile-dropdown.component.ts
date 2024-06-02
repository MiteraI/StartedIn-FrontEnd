import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-profile-dropdown',
  standalone: true,
  imports: [CommonModule, MatMenuModule],
  templateUrl: './profile-dropdown.component.html',
  styleUrl: './profile-dropdown.component.css'
})
export class ProfileDropdownComponent {
  isAuthenticated = true;
}
