import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { NavigationService } from '../services/navigation';
import { NavLink } from '../config/navigation.config';

/**
 * A guard that checks if a navigation link is disabled.
 * If the link corresponding to the route is disabled, it redirects to the 'not-found' page.
 *
 * @returns A boolean indicating if the route can be activated, or a UrlTree to redirect.
 */
export const navigationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const navigationService = inject(NavigationService);
  const path = state.url;

  // Recursive function to find a link by its path in a nested structure.
  const findLinkByPath = (links: NavLink[], targetPath: string): NavLink | undefined => {
    for (const link of links) {
      // Handle the root path separately for an exact match.
      if (link.path === '/' && targetPath === '/') {
        return link;
      }
      // Use startsWith for parent routes (e.g., /portfolio for /portfolio/123)
      // but avoid matching '/' with every path.
      if (link.path !== '/' && targetPath.startsWith(link.path)) {
        return link;
      }
      // Recurse into children if they exist.
      if (link.children) {
        const foundInChild = findLinkByPath(link.children, targetPath);
        if (foundInChild) return foundInChild;
      }
    }
    return undefined;
  };

  const navLink = findLinkByPath(navigationService.navLinks(), path);

  // If the link is found and it's disabled, redirect to the not-found page.
  if (navLink && navLink.disabled) {
    // You can also return false to just block navigation without redirecting.
    return router.createUrlTree(['/not-found']);
  }

  // Allow navigation if the link is not found or not disabled.
  return true;
};
