import { Component } from '@angular/core';
import { ProjectTitleCardComponent } from '../../components/phase-list-page/project-title-card/project-title-card.component';

@Component({
  selector: 'app-phase-list-page',
  standalone: true,
  imports: [ProjectTitleCardComponent],
  templateUrl: './phase-list-page.component.html',
  styleUrl: './phase-list-page.component.css'
})
export class PhaseListPageComponent {

}
