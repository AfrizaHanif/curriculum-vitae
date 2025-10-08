import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { PortfolioService } from '../services/data/portfolio';

/**
 * A functional route resolver that creates a dynamic, short breadcrumb label for a selected portfolio item.
 * It fetches the portfolio data and truncates the full title if it's too long,
 * appending an ellipsis for a concise label.
 */
export const portfolioBreadcrumbResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  const portfolioId = route.paramMap.get('id_portfolio')!;
  const portfolioService = inject(PortfolioService);

  return portfolioService.dataLoaded().pipe(
    take(1),
    map(() => {
      const portfolioItem = portfolioService.getPortfolioItemById(portfolioId);
      if (!portfolioItem) {
        return 'Portfolio Details';
      }

      const title = portfolioItem.title_portfolio;
      const maxLength = 35; // Define the maximum length for the breadcrumb label.

      // If the title is longer than the max length, truncate it and add an ellipsis.
      return title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;
    })
  );
};
