import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostDetail } from '../../shared/models/post/post-detail.model';
import { HttpClient } from '@angular/common/http';
import { ApplicationConfigService } from '../core/config/application-config.service';
import { CreatePost } from '../../shared/models/post/create-post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private http: HttpClient,
    private applicationConfigService: ApplicationConfigService
  ) {}

  getPostList(pageIndex: number = 1, pageSize: number = 10): Observable<any> {
    const query = `pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return this.http.get<PostDetail[]>(this.applicationConfigService.getEndpointFor(`/api/posts/active-posts?${query}`));
  }

  createPost(model: CreatePost): Observable<any> {
    const formData = new FormData();
    formData.append('content', model.content);
    for (const file of model.postImageFiles) {
      formData.append('postImageFiles', file);
    }
    return this.http.post(this.applicationConfigService.getEndpointFor('/api/posts'), formData);
  }
}
