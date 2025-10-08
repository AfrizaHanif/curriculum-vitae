import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { ProfileService } from './data/profile';

@Injectable({ providedIn: 'root' })
export class CustomTitleStrategy extends TitleStrategy {
  // Injecting necessary services
  private readonly title = inject(Title);
  private readonly profileService = inject(ProfileService);

  /** Overrides the default title update behavior to include a suffix from ProfileService.
   * If the route's data contains 'noSuffix: true', only the page title is used.
   * Otherwise, the title is formatted as "Page Title | Full Name".
   * If no page title is set, it defaults to just the full name.
   * @param snapshot The current router state snapshot.
   */
  override updateTitle(snapshot: RouterStateSnapshot): void {
    const pageTitle = this.buildTitle(snapshot);

    // If a page title is set, format it with the suffix unless 'noSuffix' is true.
    if (pageTitle) {
      // Find the deepest activated route
      let route: ActivatedRouteSnapshot = snapshot.root;
      while (route.firstChild) {
        route = route.firstChild;
      }

      // Check for the 'noSuffix' flag in the route's data property.
      // The data property is inherited, so we only need to check the deepest route.
      const noSuffix = route.data['noSuffix'] === true;

      // Set the title accordingly.
      if (noSuffix) {
        this.title.setTitle(pageTitle);
      } else {
        // Use the name from the ProfileService, with a fallback.
        const baseTitle = this.profileService.profileData().fullname_profile || 'Afriza Hanif';
        this.title.setTitle(`${pageTitle} | ${baseTitle}`);
      }
    } else {
      const baseTitle = this.profileService.profileData().fullname_profile || 'Afriza Hanif';
      this.title.setTitle(baseTitle);
    }
  }
}
