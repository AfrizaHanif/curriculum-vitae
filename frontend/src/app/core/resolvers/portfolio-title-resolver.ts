import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { PortfolioService } from '../services/portfolio';

/**
 * A functional route resolver that creates a dynamic page title for a selected portfolio item.
 * It fetches the portfolio data and finds the item corresponding to the route's 'id' parameter.
 */
export const portfolioTitleResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  // Extract the 'id' from the URL
  const portfolioId = route.paramMap.get('id_portfolio')!;

  const portfolioService = inject(PortfolioService);

  // Wait for the data to be loaded before trying to find the item.
  return portfolioService.dataLoaded().pipe(
    take(1), // Ensure the observable completes after one emission.
    map(() => {
      const portfolioItem = portfolioService.getPortfolioItemById(portfolioId);
      // Return the dynamic title
      return portfolioItem ? `${portfolioItem.title_portfolio}` : 'Portfolio Details';
    })
  );
};
