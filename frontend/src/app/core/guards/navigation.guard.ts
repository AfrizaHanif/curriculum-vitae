import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { NavigationService } from '../services/navigation.service';

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

  // Find the navLink configuration that matches the start of the current route path.
  // This handles child routes (e.g., /portfolio/1) by matching them to the parent (/portfolio).
  const navLink = navigationService.navLinks().find(link => {
    // Handle the root path separately for an exact match.
    if (link.path === '/') return path === '/';
    return path.startsWith(link.path);
  });

  // If the link is found and it's disabled, redirect to the not-found page.
  if (navLink && navLink.disabled) {
    // You can also return false to just block navigation without redirecting.
    return router.createUrlTree(['/not-found']);
  }

  // Allow navigation if the link is not found or not disabled.
  return true;
};
