import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PostDetail } from '../../../../shared/models/post-detail.model';
import { IsoToVnLocalePipe } from '../../../../shared/pipes/iso-to-locale-string.pipe';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [MatIconModule, CommonModule, IsoToVnLocalePipe],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent {
  @Input({required: true}) postDetail: PostDetail | null = null;
  shownDate: Date;
  updated: boolean;
  expanded = false;

  constructor() {
    this.updated = (this.postDetail == null) || (this.postDetail.lastUpdatedTime == null);
    this.shownDate = this.postDetail?.lastUpdatedTime ?? this.postDetail?.createdTime ?? new Date();
  }
}
