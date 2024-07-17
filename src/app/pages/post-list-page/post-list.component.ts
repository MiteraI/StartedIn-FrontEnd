import { Component } from '@angular/core';
import { PostDetailComponent } from '../../components/post-list-page/post-detail/post-detail.component';
import { PostCreateComponent } from '../../components/post-list-page/post-create/post-create.component';
import { CommonModule } from '@angular/common';
import { PostDetail } from '../../../shared/models/post/post-detail.model';
import { PostService } from '../../services/post.service';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    PostDetailComponent,
    PostCreateComponent,
    CommonModule,
    InfiniteScrollModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {
  postDetailsSubject$: BehaviorSubject<PostDetail[]> = new BehaviorSubject(new Array<PostDetail>());
  postDetails: PostDetail[] = new Array<PostDetail>();
  finished: boolean = false;
  private pageIndex: number = 1;
  private pageSize: number = 5;
  private postsShownCount: number = 0;
  private maxPostsShown: number = 30;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postDetailsSubject$.subscribe(posts => this.postDetails = posts);
    this.loadPosts();
  }

  loadPosts() {
    if (this.finished) {
      return;
    }
    this.postService
      .getPostList(this.pageIndex, this.pageSize)
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 404) {
            this.finished = true;
          }
          return throwError(() => new Error(error.error));
        })
      )
      .subscribe(posts => {
        if (!posts || !posts.length) {
          this.finished = true;
          return;
        }
        if (posts.length < this.pageSize) {
          this.finished = true;
        }
        this.pageIndex++;
        this.postsShownCount += this.pageSize;
        if (this.postsShownCount > this.maxPostsShown) {
          this.postDetailsSubject$.next([...this.postDetails, ...posts].slice(-this.maxPostsShown));
          this.postsShownCount -= this.pageSize;
        } else {
          this.postDetailsSubject$.next([...this.postDetails, ...posts]);
        }
      });
  }
}
