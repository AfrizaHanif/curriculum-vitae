import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private requestCount = signal(0);

  /**
   * A signal that holds the current loading state.
   * Components can react to changes in this signal.
   */
  readonly isLoading = computed(() => this.requestCount() > 0);

  /**
   * Increments the request counter, showing the loader if it's the first request.
   */
  show(): void {
    this.requestCount.update(count => {
      if (count === 0) {
        // console.log('LoadingService: show');
      }
      return count + 1;
    });
  }

  /**
   * Decrements the request counter, hiding the loader if it's the last active request.
   */
  hide(): void {
    this.requestCount.update(count => {
      if (count > 0) count--;
      // if (count === 0) console.log('LoadingService: hide');
      return count;
    });
  }
}
