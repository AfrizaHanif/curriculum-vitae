import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, PRIMARY_OUTLET } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Breadcrumb } from '../../interfaces/breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.html',
})
export class BreadcrumbComponent {
  public breadcrumbs$: Observable<Breadcrumb[]>;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.breadcrumbs$ = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      startWith(null), // Emit immediately on subscription
      map(() => this.createBreadcrumbs(this.activatedRoute.root))
    );
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      const nextUrl = routeURL ? `${url}/${routeURL}` : url;

      // Check for a 'breadcrumb' property in the route's resolved data first.
      // If it doesn't exist, fall back to the route's 'title'.
      const label = child.snapshot.data['breadcrumb'] || child.snapshot.title;
      if (label && routeURL) {
        breadcrumbs.push({ label, url: nextUrl });
      }

      return this.createBreadcrumbs(child, nextUrl, breadcrumbs);
    }

    return breadcrumbs;
  }
}
