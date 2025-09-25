import { Component, computed, inject, input, signal } from '@angular/core';
import { JumbotronComponent } from "../../../shared/components/jumbotron/jumbotron";
import { PortfolioService } from '../../../core/services/portfolio';
import { BlogService } from '../../../core/services/blog';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImageFallbackDirective } from "../../../shared/directives/image-fallback";
import { CardComponent } from "../../../shared/components/card/card";
import { PortfolioCardComponent } from "../components/portfolio-card/portfolio-card";
import { ImageGalleryComponent } from "../../../shared/components/image-gallery/image-gallery";
import { CarouselModalComponent } from "../../../shared/components/carousel-modal/carousel-modal";

@Component({
  selector: 'app-selected-portfolio',
  imports: [CommonModule, JumbotronComponent, RouterLink, ImageFallbackDirective, CardComponent, PortfolioCardComponent, ImageGalleryComponent, CarouselModalComponent],
  templateUrl: './selected-portfolio.html',
  styleUrl: './selected-portfolio.css'
})
export class SelectedPortfolioComponent {
  // The router will automatically bind the 'id' parameter from the URL to this input.
  id_portfolio = input.required<string>();

  copiedUrl = signal<string | null>(null); // Track the copied URL for user feedback

  private portfolioService = inject(PortfolioService); // Inject PortfolioService
  private blogService = inject(BlogService); // Inject BlogService
  private allItems = this.portfolioService.portfolios; // Get all portfolio items

  // A computed signal that reacts to changes in the id input.
  portfolioItem = computed(() => {
    const item = this.portfolioService.getPortfolioItemById(this.id_portfolio());
    // Return the found item, or undefined if not found.
    // The template should handle the case where the item is undefined.
    return item;
  });

  // Signal for the previous portfolio item
  previousItem = computed(() => {
    const currentIndex = this.allItems().findIndex(p => p.id_portfolio === this.id_portfolio());
    return currentIndex > 0 ? this.allItems()[currentIndex - 1] : undefined;
  });

  // Signal for the next portfolio item
  nextItem = computed(() => {
    const currentIndex = this.allItems().findIndex(p => p.id_portfolio === this.id_portfolio());
    return currentIndex > -1 && currentIndex < this.allItems().length - 1 ? this.allItems()[currentIndex + 1] : undefined;
  });

  // Signal for related projects
  relatedProjects = computed(() => {
    const currentItem = this.portfolioItem();
    if (!currentItem) {
      return []; // No related projects if the current item doesn't exist
    }
    // Filter all items to find projects in the same category, excluding the current one.
    return this.allItems()
      .filter(p => p.category_portfolio === currentItem.category_portfolio && p.id_portfolio !== currentItem.id_portfolio)
      .slice(0, 3); // Limit to 3 related projects
  });

  // Signal for related blog posts
  relatedBlogs = computed(() => {
    const currentItem = this.portfolioItem();
    const blogIds = currentItem?.related_blogs_portfolio;

    if (!blogIds || blogIds.length === 0) {
      return []; // No related blogs if no IDs are specified
    }

    // Since getPostById is synchronous and depends on the 'posts' signal,
    // this computed signal will react correctly when blog data is loaded.
    return blogIds
      .map(id => this.blogService.getPostById(id))
      .filter(blog => blog !== undefined); // Filter out any undefined results
  });

  constructor() {
    // No-op
  }

  /**
   * Copies the given text to the clipboard and provides user feedback.
   * @param url The text to copy.
   */
  copyToClipboard(url: string): void {
    if (this.copiedUrl() === url) return; // Avoid re-copying

    navigator.clipboard.writeText(url).then(() => {
      this.copiedUrl.set(url);
      setTimeout(() => {
        this.copiedUrl.set(null);
      }, 2000); // Reset after 2 seconds
    }).catch(err => {
      console.error('Failed to copy URL: ', err);
      // You could add user feedback for the error case here
    });
  }
}
