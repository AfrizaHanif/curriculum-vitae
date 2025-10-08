import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../../../../core/services/data/blog';
import { CommonModule } from '@angular/common';
import { ImageFallbackDirective } from '../../../../../shared/directives/image-fallback';
import { BlogData } from '../../../../../core/models/blog';

@Component({
  selector: 'app-blog-list-card',
  standalone: true,
  imports: [CommonModule, RouterLink, ImageFallbackDirective],
  templateUrl: './blog-list-card.html',
  styleUrl: './blog-list-card.scss'
})
export class BlogListCardComponent {
  item = input.required<BlogData>();
  imageUrl = computed(() => `/${this.item().image_blog}`);
}
