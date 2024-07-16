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

  isTeamMemberOpened: boolean = true;
  teamProjectDetails: TeamProjectDetails | null = null;

  constructor(
    private teamService: TeamService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (!this.teamId || this.teamId === '')
      this.snackBar.open('Có lỗi không lấy được teamId', 'Đóng', { duration: 3000 });

    this.teamService
      .getTeamById(this.teamId)
      .pipe()
      .subscribe(response => (this.teamProjectDetails = response));
  }

  openMemberInviteDialog() {
    const dialogRef = this.dialog.open<TeamInviteDialogComponent, any, string[]>(
      TeamInviteDialogComponent,
      {
        width: '50%',
        data: this.teamProjectDetails?.users,
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.length > 0 && this.teamProjectDetails) {
        this.teamService
          .sendInvitationToUserEmails(result, this.teamProjectDetails.id)
          .pipe()
          .subscribe(response => {
            this.snackBar.open(response, 'Đóng', { duration: 3000 });
          });
      }
    });
  }

  toggleTeamMemberOpened() {
    this.isTeamMemberOpened = !this.isTeamMemberOpened;
  }
}
