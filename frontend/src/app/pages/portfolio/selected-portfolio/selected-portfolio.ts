import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { JumbotronComponent } from "../../../shared/components/jumbotron/jumbotron";
import { PortfolioService } from '../../../core/services/data/portfolio';
import { TestimonialService } from '../../../core/services/data/testimonial';
import { BlogService } from '../../../core/services/data/blog';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ImageFallbackDirective } from "../../../shared/directives/image-fallback";
import { CardComponent } from "../../../shared/components/card/card";
import { PortfolioCardComponent } from "../components/portfolio-card/portfolio-card";
import { ImageGalleryComponent } from "../../../shared/components/image-gallery/image-gallery";
import { CarouselModalComponent } from "../../../shared/components/carousel-modal/carousel-modal";
import { PortfolioData } from '../../../core/models/portfolio';
import { ToastService } from '../../../core/services/toast';

@Component({
  selector: 'app-selected-portfolio',
  imports: [CommonModule, JumbotronComponent, RouterLink, ImageFallbackDirective, CardComponent, PortfolioCardComponent, ImageGalleryComponent, CarouselModalComponent,],
  templateUrl: './selected-portfolio.html',
  styleUrl: './selected-portfolio.css'
})
export class SelectedPortfolioComponent {
  // The router will automatically bind the 'slug_portfolio' parameter from the URL to this input.
  slug_portfolio = input.required<string>();

  copiedUrl = signal<string | null>(null); // Track the copied URL for user feedback

  private portfolioService = inject(PortfolioService); // Inject PortfolioService
  private blogService = inject(BlogService); // Inject BlogService
  private testimonialService = inject(TestimonialService); // Inject TestimonialService
  private allItems = this.portfolioService.portfolios; // Get all portfolio items
  private toastService = inject(ToastService);
  private readonly document = inject(DOCUMENT);
  private router = inject(Router);

  // A computed signal that reacts to changes in the id input.
  portfolioItem = computed(() => {
    const item = this.portfolioService.getPortfolioItemBySlug(this.slug_portfolio());
    // Return the found item, or undefined if not found.
    // The template should handle the case where the item is undefined.
    return item;
  });

  // A computed signal that finds all testimonials associated with the current portfolio item.
  testimonialItems = computed(() => {
    const currentItem = this.portfolioItem();
    if (!currentItem) return [];
    // Filter testimonials where the id_portfolio array includes the current item's ID.
    return this.testimonialService
      .testimonials()
      .filter(t => t.id_portfolio?.includes(currentItem.id_portfolio));
  })

  // Signal for the previous portfolio item
  previousItem = computed(() => {
    const currentIndex = this.allItems().findIndex(p => p.slug_portfolio === this.slug_portfolio());
    return currentIndex > 0 ? this.allItems()[currentIndex - 1] : undefined;
  });

  // Signal for the next portfolio item
  nextItem = computed(() => {
    const currentIndex = this.allItems().findIndex(p => p.slug_portfolio === this.slug_portfolio());
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
    // This effect will run whenever the portfolioItem signal changes.
    // If the item is undefined after the data has loaded, it means the slug is invalid.
    effect(() => {
      // The coreDataResolver ensures data is loaded, so we can check the result.
      if (this.portfolioItem() === undefined) {
        this.router.navigate(['/not-found']);
      }
    });
  }

  /**
   * Copies the given text to the clipboard and provides user feedback.
   * @param url The text to copy.
   */
  copyToClipboard(url: string): void {
    if (this.copiedUrl() === url) return; // Avoid re-copying

    navigator.clipboard.writeText(url)
      .then(() => {
        this.copiedUrl.set(url);
        this.toastService.success('Repository URL copied!');
        setTimeout(() => this.copiedUrl.set(null), 2000); // Reset icon after 2 seconds
      })
      .catch(err => {
        console.error('Failed to copy repository URL: ', err);
        this.toastService.error('Failed to copy URL.');
      });
  }

  /**
   * Shares the portfolio item using the Web Share API if available,
   * otherwise falls back to copying the URL to the clipboard.
   * @param item The portfolio item to share.
   */
  async share(item: PortfolioData): Promise<void> {
    const shareData = {
      title: `Portofolio: ${item.title_portfolio}`,
      text: `Lihat portofolio saya: ${item.title_portfolio}`,
      url: this.document.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User probably cancelled the share, so we can ignore it.
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback for browsers that do not support the Web Share API
      navigator.clipboard.writeText(shareData.url).then(() => {
        this.toastService.success('Link copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy URL: ', err);
        this.toastService.error('Failed to copy link.');
      });
    }
  }
}
