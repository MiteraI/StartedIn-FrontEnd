import { Component, Input, contentChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileDialogComponent } from '../../../dialogs/edit-profile-dialog/edit-profile-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadProfileImageDialogComponent } from '../../../dialogs/upload-profile-image-dialog/upload-profile-image-dialog.component';
import { ProfileService } from '../../../services/profile.service';
import { ReplaySubject, catchError, takeUntil, tap, throwError } from 'rxjs';
import { AccountProfile } from '../../../../shared/models/profile/profileDetail.model';

@Component({
  selector: 'app-profile-detail',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './profile-detail.component.html',
  styleUrl: './profile-detail.component.css',
})
export class ProfileDetailComponent {
  @Input() account: AccountProfile | null = null;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private profileService: ProfileService
  ) {}

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  openEditProfileDialog(): void {
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: '500px',
      data: {
        bio: this.account?.bio,
        phoneNumber: this.account?.phoneNumber,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.profileService
        .edit(result)
        .pipe(
          tap(() => {
            this.snackBar.open('Sửa hồ sơ thành công', 'Đóng', { duration: 3000 });
          }),
          catchError(error => {
            console.error(result.avatar, error);
            return throwError(() => new Error(error));
          })
        )
        .pipe(takeUntil(this.destroyed$))
        .subscribe();
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
              this.snackBar.open(response, 'Đóng', { duration: 3000 });
            }),
            catchError(error => {
              console.error(result.avatar, error);
              return throwError(() => new Error(error));
            })
          )
          .pipe(takeUntil(this.destroyed$))
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
              this.snackBar.open(response, 'Đóng', { duration: 3000 });
            }),
            catchError(error => {
              console.error(result.avatar, error);
              return throwError(() => new Error(error));
            })
          )
          .pipe(takeUntil(this.destroyed$))
          .subscribe();
      }
    });
  }
}
