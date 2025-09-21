import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'articles', pathMatch: 'full' },
  {
    path: '',
    loadComponent() {
      return import('./layout/components/layout/layout.component').then(
        (m) => m.LayoutComponent,
      );
    },
    children: [
      {
        path: 'articles',
        loadChildren: () =>
          import('./articles/article.routing').then((r) => r.ArticleRoutes),
      },
    ],
  },
];
