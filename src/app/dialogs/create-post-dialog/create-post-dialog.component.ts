import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AccountService } from '../../core/auth/account.service';
import { ReplaySubject, catchError, takeUntil, throwError } from 'rxjs';
import { Account } from '../../core/auth/account.model';
import { CreatePost } from '../../../shared/models/post/create-post.model';

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
  account: Account | null = null;
  imageUrl: string = "";
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private accountService: AccountService,
    public dialogRef: MatDialogRef<CreatePostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreatePost,
  ) {}

  loadFile(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.data.postImageFiles[0] = files[0];
    this.imageUrl = URL.createObjectURL(files[0]);
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onPostClick() {
    this.dialogRef.close(this.data);
  }

  ngOnInit() {
    this.accountService.account$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(account => this.account = account);
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
