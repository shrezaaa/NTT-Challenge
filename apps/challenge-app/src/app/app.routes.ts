import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  {
    path: '',
    loadComponent() {
      return import('./layout/components/layout/layout.component').then(
        (m) => m.LayoutComponent
      );
    },
    children: [
    //   {
    //     path: 'posts',
        
    //   },
    ],
  },
];
