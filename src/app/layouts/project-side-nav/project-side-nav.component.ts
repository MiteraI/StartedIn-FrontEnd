import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TeamService } from '../../services/team.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeamProjectDetails } from '../../../shared/models/project/team/team-project-details.model';
import { ProjectSideNavItemComponent } from './project-side-nav-item/project-side-nav-item.component';
import { ProjectList } from '../../../shared/models/project/project-list.model';
import { ProjectService } from '../../services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { TeamInviteDialogComponent } from '../../dialogs/team-invite-dialog/team-invite-dialog.component';

@Component({
  selector: 'project-side-nav',
  standalone: true,
  imports: [MatSidenavModule, CommonModule, MatIconModule, ProjectSideNavItemComponent],
  templateUrl: './project-side-nav.component.html',
  styleUrl: './project-side-nav.component.css',
})
export class ProjectSideNavComponent implements OnInit {
  @Input() opened = true;
  @Input() teamId = '';
  toggle() {
    this.opened = !this.opened;
  }

  teamProjectDetails: TeamProjectDetails | null = null;
  projectList: ProjectList[] = [];

  constructor(
    private teamService: TeamService,
    private dialog: MatDialog,
    private projectService: ProjectService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (!this.teamId || this.teamId === '')
      this.snackBar.open('Có lỗi không lấy được teamId', 'Đóng', { duration: 3000 });

    this.teamService
      .getTeamById(this.teamId)
      .pipe()
      .subscribe(response => (this.teamProjectDetails = response));

    this.projectService
      .getTeamListProjects(this.teamId)
      .pipe()
      .subscribe(response => (this.projectList = response));
  }

  openMemberInviteDialog() {
    this.dialog.open(TeamInviteDialogComponent, { width: '250px' });
  }
}
