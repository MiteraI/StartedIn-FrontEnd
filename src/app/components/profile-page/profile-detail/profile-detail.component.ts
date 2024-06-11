import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FullProfileDetail } from '../../../../shared/models/profile/fullProfileDetail.model';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileDialogComponent } from '../../../dialogs/edit-profile-dialog/edit-profile-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-detail',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './profile-detail.component.html',
  styleUrl: './profile-detail.component.css',
})
export class ProfileDetailComponent {
  @Input() account: FullProfileDetail | null = null;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {});
  }
}
