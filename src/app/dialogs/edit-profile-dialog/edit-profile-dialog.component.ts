import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { EditProfile } from '../../../shared/models/profile/editProfile.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-profile-dialog',
  standalone: true,
  imports: [MatDialogModule, CommonModule, FormsModule],
  templateUrl: './edit-profile-dialog.component.html',
  styleUrl: './edit-profile-dialog.component.css',
})
export class EditProfileDialogComponent {
  data: EditProfile = {
    bio: '',
    phoneNumber: '',
  };

  constructor(
    public dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public injectedData: any
  ) {
    if (injectedData) {
      this.data.bio = injectedData.bio;
      this.data.phoneNumber = injectedData.phoneNumber;
    }
  }

  onSubmit() {
    if (this.data) {
      this.dialogRef.close(this.data);
    } else {
      this.dialogRef.close();
    }
  }
}
