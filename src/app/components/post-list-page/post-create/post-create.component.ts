import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CreatePostDialogComponent } from '../../../dialogs/create-post-dialog/create-post-dialog.component';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent {
  content = "";

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CreatePostDialogComponent, {
      data: {content: this.content},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.content = result;
    });
  }
}
