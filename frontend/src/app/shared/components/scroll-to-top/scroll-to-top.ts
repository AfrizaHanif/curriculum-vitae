import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [],
  templateUrl: './scroll-to-top.html',
  styleUrls: ['./scroll-to-top.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollToTopComponent {
  showButton = signal(false);

  @HostListener('window:scroll')
  onWindowScroll(): void {
    // Show button when page is scrolled down more than 300px
    const yOffset = window.scrollY || document.documentElement.scrollTop;
    this.showButton.set(yOffset > 300);
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}

