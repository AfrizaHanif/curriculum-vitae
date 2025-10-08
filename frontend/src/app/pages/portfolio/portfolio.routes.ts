import { Routes } from '@angular/router';
import { portfolioBreadcrumbResolver } from '../../core/resolvers/portfolio-breadcrumb-resolver';
import { portfolioCaseStudyTitleResolver } from '../../core/resolvers/portfolio-case-study-title-resolver';
import { portfolioTitleResolver } from '../../core/resolvers/portfolio-title-resolver';

export const PORTFOLIO_ROUTES: Routes = [
  {
    // Main Page of Portfolio (Portfolio Items)
    path: '',
    loadComponent: () => import('./portfolio').then((m) => m.PortfolioComponent),
    pathMatch: 'full',
  },
  {
    // Selected Portfolio Page
    path: ':slug_portfolio', // This becomes a parent route for details and case study.
    title: portfolioTitleResolver,
    resolve: {
      breadcrumb: portfolioBreadcrumbResolver,
    },
    children: [
      {
        // Main Page of Selected Portfolio
        path: '', // The default view for /portfolio/:id
        loadComponent: () =>
          import('./selected-portfolio/selected-portfolio').then(
            (m) => m.SelectedPortfolioComponent
          ),
      },
      {
        // Case Study Page
        path: 'case-study', // The new case study route
        title: portfolioCaseStudyTitleResolver, // Use the new resolver for a specific title
        data: {
          breadcrumb: 'Studi Kasus', // Static breadcrumb label for this segment
        },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./case-study/case-study').then((m) => m.CaseStudyComponent),
          },
          {
            path: '',
            loadComponent: () =>
              import('./components/portfolio-case-study-subheader/portfolio-case-study-subheader').then((m) => m.PortfolioCaseStudySubheaderComponent),
            outlet: 'subheader',
          },
        ],
      },
    ],
  },
];
