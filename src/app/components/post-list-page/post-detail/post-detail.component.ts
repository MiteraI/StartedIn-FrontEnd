import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PostDetail } from '../../../../shared/models/posts/postDetail.model';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent {
  @Input() postDetail: PostDetail | null = null;
  expanded = false;
}
