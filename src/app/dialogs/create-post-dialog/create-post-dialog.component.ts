import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

export interface PostData {
  content: string;
  // image
}

@Component({
  selector: 'app-create-post-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './create-post-dialog.component.html',
  styleUrl: './create-post-dialog.component.css'
})
export class CreatePostDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CreatePostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PostData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onPostClick(): void {
    //create post
    this.dialogRef.close();
  }
}
