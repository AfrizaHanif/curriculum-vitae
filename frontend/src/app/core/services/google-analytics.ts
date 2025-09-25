// src/app/services/google-analytics.service.ts
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

// This declares the gtag function to avoid TypeScript errors
declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor() { }

  /**
   * Tracks a page view.
   * @param url The URL of the page being viewed.
   */
  public trackPageView(url: string): void {
    if (!environment.production) {
      console.log(`[GA-Dev] Page View: ${url}`);
      return;
    }
    gtag('config', environment.googleAnalyticsId, {
      'page_path': url
    });
  }

  /**
   * Tracks a custom event.
   * @param eventName The name of the event (e.g., 'button_click').
   * @param eventParams A dictionary of parameters for the event.
   */
  public trackEvent(eventName: string, eventParams: { [key: string]: any }): void {
    if (!environment.production) {
      console.log(`[GA-Dev] Event: ${eventName}`, eventParams);
      return;
    }
    gtag('event', eventName, eventParams);
  }
}
