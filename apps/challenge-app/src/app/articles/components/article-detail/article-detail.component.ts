import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Article, ArticleComment } from '../../types/article.type';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './article-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleDetailComponent implements OnInit {
  private articleService = inject(ArticleService);
  private activatedRoute = inject(ActivatedRoute);

  article$!: Observable<{ article: Article }>;
  comments$!: Observable<{ comments: ArticleComment[] }>;

  ngOnInit(): void {
    this.article$ = this.articleService.getArticleDetail(
      this.activatedRoute.snapshot.params['slug'],
    );
    this.comments$ = this.articleService.getArticleComments(
      this.activatedRoute.snapshot.params['slug'],
    );
  }
}
