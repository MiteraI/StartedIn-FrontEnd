import { Component } from '@angular/core';
import { PostDetailComponent } from '../../components/post-list-page/post-detail/post-detail.component';
import { PostCreateComponent } from '../../components/post-list-page/post-create/post-create.component';
import { CommonModule } from '@angular/common';
import { PostDetail } from '../../../shared/models/post-detail.model';
import { PostService } from '../../services/post.service';
import { BehaviorSubject, Observable, concat } from 'rxjs';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [PostDetailComponent, PostCreateComponent, CommonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {
  postDetailsSubject$: BehaviorSubject<PostDetail[]> = new BehaviorSubject(new Array<PostDetail>());
  postDetails: PostDetail[] = new Array<PostDetail>();
  pageIndex: number = 1;
  pageSize: number = 10;
  finished: boolean = false;

  constructor(private postService: PostService) { }
    /* const detail: PostDetail = {
      id: "id",
      authorId: "Minh Phạm",
      createdTime: new Date("2024-05-31T00:00:00Z"),
      updatedTime: null,
      content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt molestiae repellendus, impedit beatae quod explicabo est cum molestias atque. Officia unde, doloremque sapiente accusamus eum corrupti odio maiores maxime? Culpa.",
      imageUrl: "https://picsum.photos/300/200",
      interactionCount: 96,
      commentCount: 69
    }
    this.postDetails = new Array<PostDetail>(20);
    this.postDetails.fill(detail, 0, 20); */
  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    if (this.finished) {
      return;
    }
    this.postService
      .getPostList(this.pageIndex, this.pageSize)
      .subscribe(posts => {
        if (!posts || !posts.length) {
          this.finished = true;
          return;
        }
        this.postDetailsSubject$.next([...this.postDetails, ...posts]);
        this.postDetails = this.postDetailsSubject$.getValue();
      });
  }
}
