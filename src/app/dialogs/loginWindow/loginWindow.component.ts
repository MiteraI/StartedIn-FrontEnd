import { Component } from '@angular/core';
import { MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-login-window',
  standalone: true,
  imports: [MatDialogContent],
  templateUrl: './loginWindow.component.html',
  styleUrl: './loginWindow.component.css'
})
export class LoginWindowComponent {

}
