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
  private imageStatus = signal<'loading' | 'loaded' | 'error'>('loading');


  ngAfterViewInit(): void {
    const mainImageUrl = this.imageUrl();
    // Only set up the observer if there's an image to lazy load and preload.
    if (mainImageUrl) {
      this.observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Preload the image in memory before showing it.
            const img = new Image();
            img.src = mainImageUrl;
            img.onload = () => {
              // Once the image is loaded, update the status to trigger the fade-in.
              this.imageStatus.set('loaded');
            };
            img.onerror = () => {
              // If the main image fails, update the status to show the fallback.
              console.error('Jumbotron background image failed to load:', mainImageUrl);
              this.imageStatus.set('error');
            };
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
    const styles: { [key: string]: any } = {};
    const mainImageUrl = this.imageUrl();
    const status = this.imageStatus();

    if (mainImageUrl) {
      if (status === 'loaded') {
        // Set the main image on a pseudo-element via a CSS variable
        styles['--jumbotron-main-bg'] = `linear-gradient(to right, black 0%, transparent 100%), url('${mainImageUrl}')`;
        // Control the pseudo-element's opacity. It will start at 0 and transition to 1.
        styles['--jumbotron-main-opacity'] = 1;
      } else if (status === 'error') {
        // On error, set the placeholder on the pseudo-element and fade it in.
        styles['--jumbotron-main-bg'] = `linear-gradient(to right, black 0%, transparent 100%), url('${this.fallbackImageUrl}')`;
        styles['--jumbotron-main-opacity'] = 1;
      }
    }

    return styles;
  });
}
