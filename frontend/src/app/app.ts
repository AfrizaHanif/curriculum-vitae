import { Component, inject } from '@angular/core';
import { Event, NavigationCancel, NavigationError, NavigationEnd, RouteConfigLoadStart, RouteConfigLoadEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

import { LoadingIndicatorComponent } from './shared/components/loading-indicator/loading-indicator';
import { LoadingService } from './core/services/loading';
import { ScrollToTopComponent } from './shared/components/scroll-to-top/scroll-to-top';
import { ConfirmationDialogComponent } from "./shared/components/confirmation-dialog/confirmation-dialog";
import { GoogleAnalyticsService } from './core/services/google-analytics';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingIndicatorComponent, ScrollToTopComponent, ConfirmationDialogComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Inject Services
  public loadingService = inject(LoadingService);
  private router = inject(Router); // Make the service public to access it in the template

  constructor(
    private gaService: GoogleAnalyticsService
  ) {
    // Subscribe to router events to manage loading indicators and analytics
    this.router.events.subscribe((event: Event) => {
      this.updateLoadingIndicator(event);
    });

    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.gaService.trackPageView(event.urlAfterRedirects);
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  }

  private updateLoadingIndicator(event: Event): void {
    // Show the indicator when a lazy-load starts
    if (event instanceof RouteConfigLoadStart) {
      this.loadingService.show();
    }

    // Hide the indicator when the lazy-load ends, or if navigation is cancelled or fails
    if (
      event instanceof RouteConfigLoadEnd ||
      event instanceof NavigationEnd ||
      event instanceof NavigationCancel ||
      event instanceof NavigationError
    ) {
      this.loadingService.hide();
    }
  }
}
