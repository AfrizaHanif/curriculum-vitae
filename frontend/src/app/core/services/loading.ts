import { computed, Injectable, signal } from '@angular/core';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private requestCount = signal(0);
  private minimumVisibleTime = 500; // Minimum time the loader is fully visible (ms)
  private fadeOutDuration = 300;    // Duration of the fade-out animation (ms)
  private isFadingOut = signal(false);
  private loaderVisible = signal(false);
  private lastShowTime = 0;

  /**
   * A signal that holds the current loading state.
   * Components can react to changes in this signal.
   */
  readonly isLoading = this.loaderVisible.asReadonly();
  readonly isFadingOutSignal = this.isFadingOut.asReadonly();

  /**
   * Increments the request counter, showing the loader if it's the first request.
   */
  show(): void {
    if (this.requestCount() === 0) {
      this.lastShowTime = Date.now();
      this.loaderVisible.set(true);
      this.isFadingOut.set(false); // Ensure it's not fading out when showing
    }
    this.requestCount.update(count => count + 1);
  }

  /**
   * Decrements the request counter, hiding the loader if it's the last active request.
   */
  hide(): void {
    if (this.requestCount() <= 0) {
      return;
    }

    this.requestCount.update(count => count - 1);

    if (this.requestCount() === 0) {
      const elapsed = Date.now() - this.lastShowTime;
      const delayBeforeFadeOut = Math.max(0, this.minimumVisibleTime - elapsed);

      // Use a timer to ensure the loader is visible for the minimum time
      timer(delayBeforeFadeOut).subscribe(() => {
        this.isFadingOut.set(true); // Start the fade-out animation
        // Use another timer to remove the element from the DOM after the animation completes
        timer(this.fadeOutDuration).subscribe(() => {
          this.loaderVisible.set(false);
        });
      });
    }
  }
}
