import { Component } from '@angular/core';
import { FooterComponent } from "../../layouts/footer/footer.component";

@Component({
    selector: 'app-landing-page',
    standalone: true,
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.css',
    imports: [FooterComponent]
})
export class LandingPageComponent {

}
