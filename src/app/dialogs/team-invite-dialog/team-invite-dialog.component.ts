import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-team-invite-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './team-invite-dialog.component.html',
  styleUrl: './team-invite-dialog.component.css',
})
export class TeamInviteDialogComponent {
  constructor(dialogRef: MatDialogRef<TeamInviteDialogComponent>, networkService: NetworkService) {}
}
