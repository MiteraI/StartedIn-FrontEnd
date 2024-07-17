import { Component } from '@angular/core';
import { FooterComponent } from "../../layouts/footer/footer.component";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-landing-page',
    standalone: true,
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.css',
    imports: [FooterComponent, RouterLink]
})
export class LandingPageComponent {

}
