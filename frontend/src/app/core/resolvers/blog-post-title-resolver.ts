import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { BlogService } from '../services/data/blog';

/**
 * A functional route resolver that creates a dynamic page title for a blog post.
 * It fetches the blog post corresponding to the route's 'id' parameter.
 */
export const blogPostTitleResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  const postId = route.paramMap.get('id_blog')!;
  const blogService = inject(BlogService);

  return blogService.dataLoaded().pipe(
    take(1), // Ensure the observable completes after one emission.
    map(() => {
      const post = blogService.getPostById(postId);
      return post ? post.title_blog : 'Blog Post';
    })
  );
};
