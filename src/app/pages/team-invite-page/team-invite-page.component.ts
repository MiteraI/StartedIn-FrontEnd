import { Component, OnInit } from '@angular/core';
import { TeamInviteView } from '../../../shared/models/project/team/team-invite-view.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AccountService } from '../../core/auth/account.service';
import { CommonModule } from '@angular/common';
import { TeamService } from '../../services/team.service';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-team-invite-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './team-invite-page.component.html',
  styleUrl: './team-invite-page.component.css',
})
export class TeamInvitePageComponent implements OnInit {
  teamInviteView: TeamInviteView | null = null;
  isLoggedIn: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private router: Router,
    private teamService: TeamService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.teamInviteView = data['teamInviteView'];
    });

    this.accountService.isAuthenticated$.subscribe(result => (this.isLoggedIn = result));
  }

  joinTeam(): void {
    if (this.teamInviteView?.id) {
      this.teamService
        .joinTeamByTeamId(this.teamInviteView.id)
        .pipe(
          catchError(error => {
            if (error instanceof HttpErrorResponse) {
              if (error.status === 400) {
                this.snackBar.open(error.error, 'Đóng', { duration: 3000 });
              }
            }
            return of(null);
          })
        )
        .subscribe(() => {
          this.snackBar.open('Bạn đã gia nhập nhóm thành công', 'Đóng', { duration: 3000 });
          this.router.navigate(['/projects'])
        });
    }
  }
}
