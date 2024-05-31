import { Component } from '@angular/core';
import { PostDetailComponent } from '../../components/post-list-page/post-detail/post-detail.component';
import { PostCreateComponent } from '../../components/post-list-page/post-create/post-create.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [PostDetailComponent, PostCreateComponent, CommonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {

}
