import { Component } from '@angular/core';
import { MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-login-window',
  standalone: true,
  imports: [MatDialogContent],
  templateUrl: './login-window.component.html',
  styleUrl: './login-window.component.css'
})
export class LoginWindowComponent {

}
