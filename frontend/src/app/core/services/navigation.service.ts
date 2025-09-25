import { Injectable, signal } from '@angular/core';
import { NavLink, navLinks as initialNavLinks } from '../config/navigation.config';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  // Use a signal to hold the navigation links, making them reactive.
  private readonly navLinksSignal = signal<NavLink[]>(initialNavLinks);

  // Expose the links as a readonly signal to prevent outside modification.
  public readonly navLinks = this.navLinksSignal.asReadonly();

  /**
   * Updates the disabled state of a specific navigation link.
   * @param path The path of the link to update (e.g., '/testimonials').
   * @param disabled The new disabled state (true or false).
   */
  setLinkDisabled(path: string, disabled: boolean): void {
    this.navLinksSignal.update(links =>
      links.map(link =>
        link.path === path ? { ...link, disabled } : link
      )
    );
  }
}
