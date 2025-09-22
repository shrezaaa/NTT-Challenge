import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Article, ArticleComment } from '../types/article.type';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class ArticleService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getArticleList(): Observable<{
    articles: Article[];
  }> {
    return this.http.get<{ articles: Article[] }>(`${this.apiUrl}/articles`);
  }

  getArticleDetail(slug: string): Observable<{
    article: Article;
  }> {
    return this.http.get<{ article: Article }>(
      `${this.apiUrl}/articles/${slug}`,
    );
  }

  getArticleComments(slug: string): Observable<{ comments: ArticleComment[] }> {
    return this.http.get<{ comments: ArticleComment[] }>(
      `${this.apiUrl}/articles/${slug}/comments`,
    );
  }
}
