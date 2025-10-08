import { Routes } from '@angular/router';
import { blogPostTitleResolver } from '../../core/resolvers/blog-post-title-resolver';

export const BLOG_ROUTES: Routes = [
  {
    // Main Page of Blog (Blog List)
    path: '',
    loadComponent: () =>
      import('./blog-list/blog-list').then((m) => m.BlogListComponent),
    pathMatch: 'full',
  },
  {
    // Selected Blog Page (Blog Post)
    path: ':slug_blog',
    title: blogPostTitleResolver,
    loadComponent: () =>
      import('./blog-post/blog-post').then((m) => m.BlogPostComponent),
  },
];
