import { Component, computed, inject, input, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../../core/services/blog';
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
  // The router will bind the 'id' from the URL to this input.
  id_blog = input.required<string>({ alias: 'id_blog' });

  private blogService = inject(BlogService);

  // A computed signal that finds the blog post based on the ID.
  post: Signal<BlogData | undefined> = computed(() => {
    return this.blogService.getPostById(this.id_blog());
  });

  // A computed signal that finds related posts.
  relatedPosts: Signal<BlogData[]> = computed(() => {
    if (this.post()) {
      return this.blogService.getRelatedPosts(this.id_blog(), 3);
    }
    return [];
  });
}
