import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { PortfolioService } from '../services/portfolio';

/**
 * A functional route resolver that creates a dynamic page title for a portfolio case study.
 * It fetches the portfolio item corresponding to the parent route's 'id' parameter.
 */
export const portfolioCaseStudyTitleResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  // The 'id' parameter is on the parent route, so we access it via `route.parent`.
  const portfolioId = route.parent!.paramMap.get('id_portfolio')!;
  const portfolioService = inject(PortfolioService);

  return portfolioService.dataLoaded().pipe(
    take(1),
    map(() => {
      const portfolioItem = portfolioService.getPortfolioItemById(portfolioId);
      return portfolioItem ? `Studi Kasus: ${portfolioItem.title_portfolio}` : 'Studi Kasus';
    })
  );
};
