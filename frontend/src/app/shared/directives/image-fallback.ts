import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';

@Directive({
  selector: 'img[appImageFallback]', // Target only <img> elements
  standalone: true,
})
export class ImageFallbackDirective {
  /**
   * The URL for the fallback image. Defaults to a standard placeholder.
   */
  appImageFallback = input('assets/images/placeholder/placeholder-image.png');

  private elementRef = inject(ElementRef<HTMLImageElement>);

  // Listen for the 'error' event on the host element (the <img> tag).
  @HostListener('error')
  loadFallbackImage() {
    this.elementRef.nativeElement.src = this.appImageFallback();
  }
}
