import { AfterViewInit, Component, ElementRef, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageFallbackDirective } from '../../directives/image-fallback';
import { Carousel, Modal } from 'bootstrap';
@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [CommonModule, ImageFallbackDirective],
  templateUrl: './image-gallery.html',
  styleUrl: './image-gallery.css'
})
export class ImageGalleryComponent implements AfterViewInit {
  images = input<string[]>([]);
  title = input<string>('');
  modalId = input.required<string>();

  private thumbnailCarousel: Carousel | null = null;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    // Manually initialize the carousel after the view is ready.
    // This is necessary because the component might be created after the initial page load,
    // causing Bootstrap's `data-bs-ride` attribute to be missed.
    const thumbnailCarouselEl = this.elementRef.nativeElement.querySelector('.carousel');
    if (thumbnailCarouselEl) {
      // Ensure we don't re-initialize if an instance already exists
      // Store the instance so we can call its methods (e.g., .prev(), .next())
      this.thumbnailCarousel = Carousel.getOrCreateInstance(thumbnailCarouselEl);
    }
  }

  /**
   * Programmatically opens the Bootstrap modal and navigates to the correct slide.
   * This is more reliable than relying on data-bs-* attributes across components.
   * @param slideIndex The index of the carousel slide to show.
   */
  openModal(slideIndex: number): void {
    const modalElement = document.getElementById(this.modalId());
    if (modalElement) {
      // 1. Get or create the modal instance and show it.
      const modal = Modal.getOrCreateInstance(modalElement);
      modal.show();

      // 2. Find the main carousel inside the modal.
      const mainCarouselEl = modalElement.querySelector('.carousel');
      if (mainCarouselEl) {
        // 3. Get or create its instance and tell it which slide to go to.
        const mainCarousel = Carousel.getOrCreateInstance(mainCarouselEl);
        mainCarousel.to(slideIndex);
      }
    }
  }

  // Methods to programmatically control the thumbnail carousel
  prevThumbnail(): void { this.thumbnailCarousel?.prev(); }
  nextThumbnail(): void { this.thumbnailCarousel?.next(); }

  /**
   * A signal that returns an array of chunked images for the thumbnail carousel.
   * Each chunk contains up to 4 images.
   */
  chunkedImages = computed(() => {
    const imagesArray = this.images();
    const chunkSize = 4;
    return Array.from({ length: Math.ceil(imagesArray.length / chunkSize) }, (_, i) =>
      imagesArray.slice(i * chunkSize, i * chunkSize + chunkSize)
    );
  });
}
