import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageFallbackDirective } from '../../directives/image-fallback';

@Component({
  selector: 'app-carousel-modal',
  standalone: true,
  imports: [CommonModule, ImageFallbackDirective],
  templateUrl: './carousel-modal.html',
  styleUrl: './carousel-modal.scss'
})
export class CarouselModalComponent {
  id = input.required<string>();
  title = input<string>('');
  images = input<string[]>([]);

  /**
   * Handles the 'load' event of a carousel image.
   * It adds a 'loaded' class to the parent carousel item to hide the spinner
   * and reveal the image.
   * @param event The load event.
   * @param carouselItem The parent carousel item HTML element.
   */
  onCarouselImageLoad(event: Event, carouselItem: HTMLElement): void {
    // The target of the event is the <img> element.
    const imgElement = event.target as HTMLImageElement;
    // We add the 'loaded' class to the parent .carousel-item
    if (imgElement.complete) {
      carouselItem.classList.add('loaded');
    }
  }
}
