import { Directive, ElementRef, Renderer2, effect, input } from '@angular/core';

@Directive({
  selector: '[appBackgroundImageFallback]',
  standalone: true,
})
export class BackgroundImageFallbackDirective {
  imageUrl = input<string | undefined | null>(undefined, { alias: 'appBackgroundImageFallback' });
  fallbackUrl = input.required<string>();

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    effect(() => {
      const primaryUrl = this.imageUrl();
      const fallback = this.fallbackUrl();
      this.setBackground(primaryUrl, fallback);
    });
  }

  private setBackground(primaryUrl: string | undefined | null, fallbackUrl: string): void {
    // Add a class to the host element to indicate loading is in progress
    this.renderer.addClass(this.elementRef.nativeElement, 'loading-background');
    // Temporarily remove any existing background to show the spinner's container background
    this.renderer.setStyle(this.elementRef.nativeElement, 'backgroundImage', 'none');

    if (!primaryUrl) {
      // If the primary URL is null or empty, use the fallback immediately.
      this.setImage(fallbackUrl);
      this.renderer.removeClass(this.elementRef.nativeElement, 'loading-background');
      return;
    }

    const img = new Image();
    img.onload = () => {
      this.setImage(primaryUrl);
      this.renderer.removeClass(this.elementRef.nativeElement, 'loading-background');
    };
    img.onerror = () => {
      this.setImage(fallbackUrl);
      this.renderer.removeClass(this.elementRef.nativeElement, 'loading-background');
    };
    img.src = primaryUrl;
  }

  private setImage(url: string): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'backgroundImage', `url('${url}')`);
  }
}
