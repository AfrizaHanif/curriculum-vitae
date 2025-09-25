import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PortfolioData } from '../../../../core/models/portfolio';
import { ImageFallbackDirective } from "../../../../shared/directives/image-fallback";

@Component({
  selector: 'app-portfolio-card',
  standalone: true,
  imports: [CommonModule, RouterLink, ImageFallbackDirective],
  templateUrl: './portfolio-card.html',
  styleUrl: './portfolio-card.scss',
  host: {
    class: 'col'
  }
})
export class PortfolioCardComponent {
  // Receive portfolio item data from the parent component.
  item = input.required<PortfolioData>();
  imageUrl = computed(() => `/${this.item().image_portfolio}`);
}
