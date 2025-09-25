import { Component, computed, input } from '@angular/core';
import { BlogData } from '../../../../../core/models/blog';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImageFallbackDirective } from '../../../../../shared/directives/image-fallback';

@Component({
  selector: 'app-related-post-card',
  imports: [CommonModule, RouterLink, ImageFallbackDirective],
  templateUrl: './related-post-card.html',
  styleUrl: './related-post-card.css'
})
export class RelatedPostCard {
  item = input.required<BlogData>();
  imageUrl = computed(() => `/${this.item().image_blog}`);
}
