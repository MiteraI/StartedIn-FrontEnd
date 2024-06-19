import { Component } from '@angular/core';
import { ProjectTitleCardComponent } from '../../components/phase-list-page/project-title-card/project-title-card.component';
import { PhaseDropdownComponent } from '../../components/phase-list-page/phase-dropdown/phase-dropdown.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-phase-list-page',
  standalone: true,
  imports: [ProjectTitleCardComponent, PhaseDropdownComponent, MatIconModule],
  templateUrl: './phase-list-page.component.html',
  styleUrl: './phase-list-page.component.css'
})
export class PhaseListPageComponent {

}
