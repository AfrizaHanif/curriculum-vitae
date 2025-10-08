import { NgClass, NgStyle } from '@angular/common';
import { AfterViewInit, Component, computed, ElementRef, inject, input, OnDestroy, signal } from '@angular/core';
import { LoadingService } from '../../../core/services/loading';

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
  private loadingService = inject(LoadingService);
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
            this.loadingService.show(); // Signal that image loading has started

            // Preload the image in memory before showing it.
            const img = new Image();
            img.src = mainImageUrl;
            img.onload = () => {
              // Once the image is loaded, update the status to trigger the fade-in.
              this.imageStatus.set('loaded');
              this.loadingService.hide(); // Signal that image loading has finished
            };
            img.onerror = () => {
              // If the main image fails, update the status to show the fallback.
              console.error('Jumbotron background image failed to load:', mainImageUrl);
              this.imageStatus.set('error');
              this.loadingService.hide(); // Also hide loader on error
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
      // Use the main image URL if loaded, otherwise the fallback.
      // The opacity will handle the fade-in, so we set the URL directly.
      const imageUrl = status === 'error' ? this.fallbackImageUrl : mainImageUrl;
      // The gradient goes from black on the left to fully transparent on the right.
      // 'transparent' is equivalent to rgba(0, 0, 0, 0).
      // You can also use rgba to specify a semi-transparent black, e.g., rgba(0, 0, 0, 0.5) for 50% opacity.
      styles['background-image'] = `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.3) 100%), url('${imageUrl}')`;
      styles['opacity'] = status === 'loaded' ? 1 : 0;
    } else {
      // No image URL provided, ensure it's transparent
      styles['background-image'] = 'none';
    }

    return styles;
  });
}
