import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CreatePostDialogComponent } from '../../../dialogs/create-post-dialog/create-post-dialog.component';
import { Account } from '../../../core/auth/account.model';
import { ReplaySubject, catchError, takeUntil, throwError } from 'rxjs';
import { AccountService } from '../../../core/auth/account.service';
import { CreatePost } from '../../../../shared/models/create-post.model';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent {
  account: Account | null = null;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(public dialog: MatDialog, private accountService: AccountService, private postService: PostService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CreatePostDialogComponent, {
      data: {
        content: "",
        postImageFiles: new Array<File>()
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      const postData = result as CreatePost;
      this.postService.createPost(postData).pipe(
        catchError(error => {
          return throwError(() => new Error(error));
        })
      );
    });
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
