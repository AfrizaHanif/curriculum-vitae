import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID); // Inject PLATFORM_ID to check if running in browser

  // Signal to hold the current theme for UI updates
  currentTheme = signal<string>('auto');
  // Signal to hold the icon for the current theme
  themeIcon = signal<string>('bi-circle-half');

  private readonly THEME_KEY = 'theme'; // Key for localStorage

  constructor() {
    // The constructor now only sets the initial signal values.
    // The main logic is deferred to `initializeTheme` to be run by APP_INITIALIZER.
    if (isPlatformBrowser(this.platformId)) {
      this.currentTheme.set(this.getStoredTheme());
      this.updateThemeIcon(this.currentTheme());
    }
  }

  /**
   * Initializes the theme by applying the stored theme and setting up listeners.
   * This method is intended to be called by an APP_INITIALIZER.
   */
  initializeTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setTheme(this.getStoredTheme());
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        this.setTheme(this.getStoredTheme());
      });
    }
  }

  /**
   * Sets the theme and stores the preference.
   * @param theme The theme to set ('light', 'dark', or 'auto').
   */
  setTheme(theme: 'light' | 'dark' | 'auto'): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.currentTheme.set(theme);
    this.updateThemeIcon(theme);
    this.applyTheme(theme); // Apply theme immediately on change

    // Persist preference
    if (theme === 'auto') {
      localStorage.removeItem(this.THEME_KEY);
    } else {
      localStorage.setItem(this.THEME_KEY, theme);
    }
  }

  /** Applies the theme to the document.
   * @param theme The theme to apply ('light', 'dark', or 'auto').
   */
  private applyTheme(theme: 'light' | 'dark' | 'auto'): void {
    let effectiveTheme = theme;
    if (theme === 'auto') {
      effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-bs-theme', effectiveTheme);
  }

  /** Updates the theme icon based on the current theme.
   * @param theme The current theme.
   */
  private updateThemeIcon(theme: string): void {
    if (theme === 'auto') this.themeIcon.set('bi-circle-half');
    else if (theme === 'light') this.themeIcon.set('bi-sun-fill');
    else this.themeIcon.set('bi-moon-stars-fill');
  }

  /**
   * Retrieves the stored theme from localStorage, defaulting to 'auto'.
   * @returns The stored theme.
   */
  private getStoredTheme(): 'light' | 'dark' | 'auto' {
    const storedTheme = localStorage.getItem(this.THEME_KEY);
    return (storedTheme as 'light' | 'dark' | 'auto') || 'auto';
  }
}
