import { Route } from '@angular/router';
import { ArticleService } from './services/article.service';

export const ArticleRoutes: Route[] = [
  {
    path: '',
    providers: [ArticleService],
    children: [
      {
        path: '',
        loadComponent() {
          return import(
            './components/articles-list/articles-list.component'
          ).then((r) => r.ArticlesListComponent);
        },
      },
      {
        path: ':slug',
        loadComponent() {
          return import(
            './components/article-detail/article-detail.component'
          ).then((r) => r.ArticleDetailComponent);
        },
      },
    ],
  },
];
