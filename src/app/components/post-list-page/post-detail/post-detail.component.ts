import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PostDetail } from '../../../../shared/models/post/post-detail.model';
import { IsoToVnLocalePipe } from '../../../../shared/pipes/iso-to-locale-string.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [MatIconModule, CommonModule, IsoToVnLocalePipe, RouterLink],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent {
  @Input({required: true}) postDetail: PostDetail | null = null;
  shownDate: Date;
  expanded = false;

  constructor() {
    this.shownDate = this.postDetail?.lastUpdatedTime ?? new Date();
  }
}
