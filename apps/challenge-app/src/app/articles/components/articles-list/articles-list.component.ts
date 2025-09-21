import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Article } from '../../types/article.type';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-articles-list',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatIconModule,
    RouterLink,
    MatProgressSpinnerModule,
  ],
  templateUrl: './articles-list.component.html',
})
export class ArticlesListComponent implements OnInit {
  private articleService = inject(ArticleService);

  articles$!: Observable<{ articles: Article[] }>;

  ngOnInit(): void {
    this.articles$ = this.articleService.getArticleList();
  }
}
