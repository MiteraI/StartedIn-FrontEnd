import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { EditProfile } from '../../../shared/models/profile/editProfile.model';
import { ProfileService } from '../../services/profile.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile-dialog',
  standalone: true,
  imports: [MatDialogModule, CommonModule, FormsModule],
  templateUrl: './edit-profile-dialog.component.html',
  styleUrl: './edit-profile-dialog.component.css',
})
export class EditProfileDialogComponent {
  data: EditProfile = {
    content: '',
    bio: '',
    phoneNumber: '',
  };

  constructor(
    private profileService: ProfileService,
    public dialogRef: MatDialogRef<EditProfileDialogComponent>,
    private router: Router,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public injectedData: any
  ) {
    if (injectedData) {
      this.data.bio = injectedData.bio;
      this.data.content = injectedData.content;
      this.data.phoneNumber = injectedData.phoneNumber;
    }
  }

  onSubmit() {
    this.profileService.edit(this.data).subscribe(
      response => {
        console.log('Put Success', response);
        this.dialogRef.close(true);
        this.router.navigate(['/profile']).then(() => {
          this.snackBar.open('Sửa hồ sơ thành công', 'Close', { duration: 3000 });
          // setTimeout(() => {
          //   window.location.reload();
          // }, 3000);
        });
      },
      error => {
        this.snackBar.open('Sửa hồ sơ thất bại', 'Close', { duration: 3000 });
        console.error('Put error', error);
      }
    );
  }
}
