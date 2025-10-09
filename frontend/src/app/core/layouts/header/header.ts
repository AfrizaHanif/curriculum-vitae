import { Component, inject, AfterViewInit, OnDestroy, ElementRef, signal, WritableSignal, OnInit, PLATFORM_ID, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DropdownComponent } from "../../../shared/components/dropdown/dropdown";
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../../services/theme';
import { NavigationService } from '../../services/navigation';
import { NavLink } from '../../config/navigation.config';
import { TooltipDirective } from "../../../shared/directives/tooltip";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, DropdownComponent, TooltipDirective],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  // Inject services
  protected themeService = inject(ThemeService);
  private elementRef = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private navigationService = inject(NavigationService);
  private router = inject(Router);

  // To hold the timeout ID for debouncing resize events
  private resizeDebounceTimeout: any;

  /**
   * The maximum number of navigation links to display before moving them
   * into a "More" dropdown.
   */
  public visibleLinksLimit: WritableSignal<number> = signal(7);

  // Navigation links for the header
  navLinks = this.navigationService.navLinks;

  ngOnInit(): void {
    // Set the initial number of links on component load
    if (isPlatformBrowser(this.platformId)) {
      this.updateVisibleLinksLimit();
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    // Debounce the resize event to avoid performance issues
    clearTimeout(this.resizeDebounceTimeout);
    this.resizeDebounceTimeout = setTimeout(() => this.updateVisibleLinksLimit(), 150);
  }

  ngOnDestroy(): void {
    // Clear the resize timeout when the component is destroyed
    clearTimeout(this.resizeDebounceTimeout);
  }

  /**
   * Sets the color theme for the application.
   * @param theme The theme to set ('light', 'dark', or 'auto').
   * @param event The click event to prevent default anchor behavior.
   */
  setTheme(theme: 'light' | 'dark' | 'auto', event: Event): void {
    event.preventDefault();
    this.themeService.setTheme(theme); // No longer needs the second argument
  }

  /**
   * Updates the `visibleLinksLimit` signal based on the current window width.
   */
  private updateVisibleLinksLimit(): void {
    this.visibleLinksLimit.set(this.calculateVisibleLinks(window.innerWidth));
  }

  /**
   * Calculates the number of visible links based on the window width.
   * These breakpoints are based on Bootstrap's grid system.
   * @param width The current window width.
   * @returns The number of links to show.
   */
  private calculateVisibleLinks(width: number): number {
    if (width >= 1400) { // xxl
      return 8;
    }
    if (width >= 1200) { // xl
      return 7;
    }
    return 6; // lg
  }

  /**
   * Checks if any of the links within the "More" dropdown are currently active.
   * @returns `true` if an item in the dropdown is active, otherwise `false`.
   */
  isMoreDropdownActive(): boolean {
    const linksInDropdown = this.navLinks().slice(this.visibleLinksLimit());
    return linksInDropdown.some(link =>
      this.router.isActive(link.path, {
        paths: link.exact ? 'exact' : 'subset',
        queryParams: 'subset',
        fragment: 'ignored',
        matrixParams: 'ignored'
      })
    );
  }

  /**
   * Checks if any child link of a dropdown is active.
   * @param parentLink The parent navigation link with children.
   * @returns `true` if any child link is active, otherwise `false`.
   */
  isDropdownActive(parentLink: NavLink): boolean {
    return parentLink.children?.some(child =>
      this.router.isActive(child.path, {
        paths: child.exact ? 'exact' : 'subset',
        queryParams: 'subset',
        fragment: 'ignored',
        matrixParams: 'ignored'
      })
    ) ?? false;
  }
}
