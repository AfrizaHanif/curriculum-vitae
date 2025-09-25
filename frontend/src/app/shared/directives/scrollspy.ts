import { Directive, ElementRef, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
import { ScrollSpy } from 'bootstrap';

@Directive({
  selector: '[appScrollSpy]',
  standalone: true,
})
export class ScrollSpyDirective implements AfterViewInit, OnDestroy {
  private instance: ScrollSpy | null = null;
  private clickListener: ((event: Event) => void) | null = null;
  private navContainer: Element | null = null;

  constructor(private el: ElementRef<HTMLElement>, private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.instance = ScrollSpy.getOrCreateInstance(this.el.nativeElement);

      setTimeout(() => {
        this.instance?.refresh();

        const targetId = this.el.nativeElement.getAttribute('data-bs-target');
        if (targetId) {
          this.navContainer = document.querySelector(targetId);
          if (this.navContainer) {
            this.clickListener = (event: Event) => {
              const anchor = (event.target as HTMLElement).closest('a[href*="#"]');
              if (!anchor) { return; }

              const hash = (anchor as HTMLAnchorElement).hash;
              const targetSection = hash ? document.querySelector(hash) : null;

              if (targetSection) {
                event.preventDefault();
                const scrollSpyEl = this.el.nativeElement;
                const isWindowScroll = getComputedStyle(scrollSpyEl).overflowY !== 'scroll';
                const scrollTarget = isWindowScroll ? window : scrollSpyEl;
                const top = (targetSection as HTMLElement).offsetTop - (isWindowScroll ? 0 : scrollSpyEl.offsetTop);
                scrollTarget.scrollTo({ top, behavior: 'smooth' });
              }
            };
            this.navContainer.addEventListener('click', this.clickListener);
          }
        }
      }, 150);
    });
  }

  ngOnDestroy(): void {
    this.instance?.dispose();
    if (this.navContainer && this.clickListener) {
      this.navContainer.removeEventListener('click', this.clickListener);
    }
  }
}
