import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostDetail } from '../../shared/models/post-detail.model';
import { HttpClient } from '@angular/common/http';
import { ApplicationConfigService } from '../core/config/application-config.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private http: HttpClient,
    private applicationConfigService: ApplicationConfigService
  ) {}

  getPostList(pageIndex: number = 1, pageSize: number = 10): Observable<any> {
    let query = `pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return this.http.get<PostDetail[]>(this.applicationConfigService.getEndpointFor(`/api/posts/active-posts?${query}`));
  }
}
