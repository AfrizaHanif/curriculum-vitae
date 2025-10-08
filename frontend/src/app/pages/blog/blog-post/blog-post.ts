import { Component, computed, effect, inject, input, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BlogService } from '../../../core/services/data/blog';
import { BlogData } from '../../../core/models/blog';
import { ImageFallbackDirective } from '../../../shared/directives/image-fallback';
import { RelatedPostCard } from "./components/related-post-card/related-post-card";

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, RouterLink, ImageFallbackDirective, RelatedPostCard],
  templateUrl: './blog-post.html',
  styleUrls: ['./blog-post.css']
})
export class BlogPostComponent {
  // The router will bind the 'slug_blog' from the URL to this input.
  slug_blog = input.required<string>();

  private blogService = inject(BlogService);
  private router = inject(Router);

  // A computed signal that finds the blog post based on the ID.
  post: Signal<BlogData | undefined> = computed(() => {
    return this.blogService.getPostBySlug(this.slug_blog());
  });

  // A computed signal that finds related posts.
  relatedPosts: Signal<BlogData[]> = computed(() => {
    const currentPost = this.post();
    if (currentPost) {
      // getRelatedPosts uses the post ID to find related content.
      return this.blogService.getRelatedPosts(currentPost.id_blog, 3);
    }
    return [];
  });

  constructor() {
    // This effect will run whenever the post signal changes.
    // If the post is undefined after the data has loaded, it means the slug is invalid.
    effect(() => {
      if (this.post() === undefined) {
        this.router.navigate(['/not-found']);
      }
    });
  }
}
