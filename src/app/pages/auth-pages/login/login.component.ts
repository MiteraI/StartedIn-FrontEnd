import { Component } from '@angular/core';
import { LoginWindowComponent } from '../../../dialogs/login-window/login-window.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginWindowComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
