import { Component, Input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'project-title-card',
  standalone: true,
  imports: [MatProgressBarModule],
  templateUrl: './project-title-card.component.html',
  styleUrl: './project-title-card.component.css'
})
export class ProjectTitleCardComponent {
  @Input({required: true}) projectName: string = "";
  @Input({required: true}) creatorName: string = "";
}
