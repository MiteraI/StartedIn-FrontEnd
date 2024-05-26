import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';

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

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('/login') || event.url.includes('register')) {
          this.hideHeader = true;
          this.hideFooter = true;
        } else if (event.url.includes('')) {
          this.hideHeader = false;
          this.hideFooter = true;
        } else {
          this.hideHeader = false;
          this.hideFooter = false;
        }
      }
    });
  }
}
