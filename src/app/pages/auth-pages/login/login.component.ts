import { Component } from '@angular/core';
import { LoginWindowComponent } from '../../../dialogs/login-window/login-window.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginWindowComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
