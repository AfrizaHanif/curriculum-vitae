import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  Renderer2,
  ViewChild,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header';
import { FooterComponent } from '../footer/footer';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb';
import { ToastContainerComponent } from '../../../shared/components/toast-container/toast-container';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, BreadcrumbComponent, ToastContainerComponent],
  templateUrl: './public-layout.html',
})
export class PublicLayoutComponent implements AfterViewInit, OnDestroy {
  // Get a reference to the HeaderComponent's host element
  @ViewChild(HeaderComponent, { read: ElementRef })
  private headerEl!: ElementRef<HTMLElement>;

  private resizeObserver?: ResizeObserver;

  // Inject services using the inject() function for a cleaner approach
  private renderer = inject(Renderer2);
  private hostEl = inject(ElementRef);

  ngAfterViewInit(): void {
    // A good practice to ensure the element is found before observing
    if (!this.headerEl?.nativeElement) {
      console.error('Header element not found for ResizeObserver.');
      return;
    }

    // Create a ResizeObserver to watch for size changes on the header element
    this.resizeObserver = new ResizeObserver(entries => {
      // We only have one observed element, so we can grab the first entry
      const headerHeight = entries[0].contentRect.height;
      // Set the CSS variable on this component's host element directly
      this.renderer.setStyle(this.hostEl.nativeElement, '--header-height', `${headerHeight}px`);
    });

    this.resizeObserver.observe(this.headerEl.nativeElement);
  }

  ngOnDestroy(): void {
    // Clean up the observer when the component is destroyed
    this.resizeObserver?.disconnect();
  }
}
