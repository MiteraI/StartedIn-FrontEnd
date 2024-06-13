import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-upload-profile-image-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './upload-profile-image-dialog.component.html',
  styleUrl: './upload-profile-image-dialog.component.css',
})
export class UploadProfileImageDialogComponent {
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private dialogRef: MatDialogRef<UploadProfileImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.previewUrl = data.previewUrl;
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.selectedFile) {
      this.dialogRef.close({ avatar: this.selectedFile });
    } else {
      this.dialogRef.close();
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

}
