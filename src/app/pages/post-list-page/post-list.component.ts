import { Component } from '@angular/core';
import { PostDetailComponent } from '../../components/post-list-page/post-detail/post-detail.component';
import { PostCreateComponent } from '../../components/post-list-page/post-create/post-create.component';
import { CommonModule } from '@angular/common';
import { PostDetail } from '../../../shared/models/posts/postDetail.model';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [PostDetailComponent, PostCreateComponent, CommonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {
  postDetails: PostDetail[];
  constructor() {
    const detail: PostDetail = {
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
    this.postDetails.fill(detail, 0, 20);
  }
}
