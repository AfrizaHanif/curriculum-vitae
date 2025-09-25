import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';
import { Breadcrumb } from '../../shared/interfaces/breadcrumb';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private readonly _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);
  readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        const root = this.router.routerState.snapshot.root;
        const breadcrumbs: Breadcrumb[] = [];
        this.addBreadcrumb(root, [], breadcrumbs);
        this._breadcrumbs$.next(breadcrumbs);
      });
  }

  private addBreadcrumb(route: ActivatedRouteSnapshot | null, parentUrl: string[], breadcrumbs: Breadcrumb[]): void {
    if (!route) {
      return;
    }

    const routeUrl = parentUrl.concat(route.url.map(url => url.path));
    const breadcrumbData = route.data['breadcrumb'];

    if (breadcrumbData) {
      const breadcrumb = {
        label: this.getLabel(breadcrumbData, route),
        url: '/' + routeUrl.join('/'),
      };
      breadcrumbs.push(breadcrumb);
    }

    this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
  }

  private getLabel(breadcrumbData: any, route: ActivatedRouteSnapshot): string {
    // If breadcrumb is a string, return it directly.
    if (typeof breadcrumbData === 'string') {
      return breadcrumbData;
    }

    // Handle object-based breadcrumbs, like { alias: 'blogPost' } or resolved data { label: '...' }
    if (breadcrumbData.alias === 'blogPost') {
      // Use the title resolved by `blogPostTitleResolver`
      return route.title ?? 'Blog Post';
    }

    // Fallback for other complex objects or functions if needed
    return '...';
  }
}
