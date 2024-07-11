import { Component } from '@angular/core';
import { ProjectTitleCardComponent } from '../../../components/project-pages/phase-list-page/project-title-card/project-title-card.component';
import { PhaseDropdownComponent } from '../../../components/project-pages/phase-list-page/phase-dropdown/phase-dropdown.component';
import { MatIconModule } from '@angular/material/icon';
import { PhaseCreateComponent } from '../../../components/project-pages/phase-list-page/phase-create/phase-create.component';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ProjectSideNavComponent } from '../../../layouts/project-side-nav/project-side-nav.component';
import { ProjectFullInfo } from '../../../../shared/models/project/project-full-info.model';
import { PhaseListItem } from '../../../../shared/models/project/phase-list-item.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-phase-list-page',
  standalone: true,
  imports: [
    ProjectSideNavComponent,
    ProjectTitleCardComponent,
    PhaseDropdownComponent,
    PhaseCreateComponent,
    MatIconModule,
    DragDropModule,
    CommonModule
  ],
  templateUrl: './phase-list-page.component.html',
  styleUrl: './phase-list-page.component.css'
})
export class PhaseListPageComponent {
  project: ProjectFullInfo = {
    id: "",
    projectName: "",
    teamId: "",
    leader: {
      id: "",
      fullName: "",
      email: "",
      profilePicture: "",
    },
    phases: []
  }

  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activeRoute.data.subscribe(data => {
      this.project = data['project'];
      console.log(this.project);
    });
  }

  drop(event: CdkDragDrop<PhaseListItem[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }
}
