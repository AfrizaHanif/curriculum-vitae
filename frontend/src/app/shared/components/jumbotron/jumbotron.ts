import { NgClass, NgStyle } from '@angular/common';
import { AfterViewInit, Component, computed, ElementRef, inject, input, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-jumbotron',
  standalone: true,
  imports: [NgStyle, NgClass],
  templateUrl: './jumbotron.html',
  styleUrl: './jumbotron.scss'
})
export class JumbotronComponent implements AfterViewInit, OnDestroy {
  imageUrl = input<string>(); // Optional URL for the background image
  imageAlt = input<string>(''); // Optional alt text for accessibility

  private readonly fallbackImageUrl = 'assets/images/placeholder/placeholder-image.png'; // Local fallback image path
  private elementRef = inject(ElementRef);
  private observer?: IntersectionObserver;

  /** Signal to track if the image should be loaded. */
  private imageVisible = signal(false);

  ngAfterViewInit(): void {
    // Only set up the observer if there's an image to lazy load.
    if (this.imageUrl()) {
      this.observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.imageVisible.set(true);
            this.observer?.disconnect(); // Clean up the observer once the image is visible.
          }
        });
      });
      this.observer.observe(this.elementRef.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  /**
   * Returns the background styles for the jumbotron if an effectiveImageUrl is set.
   * @returns An object with background styles or an empty object.
   */
  protected backgroundStyles = computed(() => {
    const imageUrl = this.imageUrl();
    // Only apply background image styles if an imageUrl is provided AND it's visible.
    if (imageUrl && this.imageVisible()) {
      return {
        // The browser will try to load the first image. If it fails, it will use the next one.
        // We also keep the gradient overlay for text readability.
        'background-image': `linear-gradient(to right, black 0%, transparent 100%), url('${imageUrl}'), url('${this.fallbackImageUrl}')`,
        'background-size': 'cover',
        'background-position': 'center',
        'transition': 'background-image 0.5s ease-in-out' // Optional: Add a fade-in effect
      };
    }
    return {};
  });
}
