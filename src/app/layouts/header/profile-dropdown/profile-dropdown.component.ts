import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { AccountService } from '../../../core/auth/account.service';

@Component({
  selector: 'app-profile-dropdown',
  standalone: true,
  imports: [CommonModule, MatMenuModule],
  templateUrl: './profile-dropdown.component.html',
  styleUrl: './profile-dropdown.component.css'
})
export class ProfileDropdownComponent {
  constructor(private accountService: AccountService) {

  }
  isAuthenticated = true;

  logout() {
    this.accountService.logout();
  }
}
