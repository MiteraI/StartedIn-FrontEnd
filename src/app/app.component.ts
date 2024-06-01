import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { AuthJwtService } from './core/auth/auth-jwt.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'StartedIn';
  hideHeader = false;
  hideFooter = false;

  constructor(
    private router: Router,
    private jwtAuth: AuthJwtService,
    private http: HttpClient
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('/login') || event.url.includes('register')) {
          this.hideHeader = true;
          this.hideFooter = true;
        } else {
          this.hideHeader = false;
          this.hideFooter = false;
        }
      }
    });
  }

  test() {
    this.http.get('http://localhost:5135/api/test').subscribe();
  }
}
