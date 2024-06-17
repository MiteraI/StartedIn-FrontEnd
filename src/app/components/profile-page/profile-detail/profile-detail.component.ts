import { Component, Input, contentChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FullProfileDetail } from '../../../../shared/models/profile/fullProfileDetail.model';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileDialogComponent } from '../../../dialogs/edit-profile-dialog/edit-profile-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadProfileImageDialogComponent } from '../../../dialogs/upload-profile-image-dialog/upload-profile-image-dialog.component';
import { ProfileService } from '../../../services/profile.service';
import { catchError, tap, throwError } from 'rxjs';

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
    private snackBar: MatSnackBar,
    private profileService: ProfileService
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: '500px',
      data: {
        bio: this.account?.bio,
        phoneNumber: this.account?.phoneNumber,
      },
    });
  }

  openProfileImageUploadDialog(): void {
    const dialogRef = this.dialog.open(UploadProfileImageDialogComponent, {
      width: '500px',
      data: { previewUrl: this.account?.profilePicture },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.avatar) {
        this.profileService
          .uploadProfileImage(result.avatar)
          .pipe(
            tap((response: string) => {
              this.snackBar.open(response, 'Close', { duration: 3000 });
            }),
            catchError(error => {
              console.error(result.avatar, error);
              return throwError(() => new Error(error));
            })
          )
          .subscribe();
      }
    });
  }

  openCoverImageUploadDialog(): void {
    const dialogRef = this.dialog.open(UploadProfileImageDialogComponent, {
      width: '500px',
      data: { previewUrl: this.account?.coverPhoto },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.avatar) {
        this.profileService
          .uploadCoverPhoto(result.avatar)
          .pipe(
            tap((response: string) => {
              this.snackBar.open(response, 'Close', { duration: 3000 });
            }),
            catchError(error => {
              console.error(result.avatar, error);
              return throwError(() => new Error(error));
            })
          )
          .subscribe();
      }
    });
  }
}
