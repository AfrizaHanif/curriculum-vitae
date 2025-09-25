import { Routes } from '@angular/router';
import { portfolioTitleResolver } from './core/resolvers/portfolio-title-resolver';
import { PublicLayoutComponent } from './core/layouts/public-layout/public-layout';
import { coreDataResolver } from './core/resolvers/core-data-resolver';
import { portfolioCaseStudyTitleResolver } from './core/resolvers/portfolio-case-study-title-resolver';
import { portfolioBreadcrumbResolver } from './core/resolvers/portfolio-breadcrumb-resolver';
import { blogPostTitleResolver } from './core/resolvers/blog-post-title-resolver';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    // Apply the resolver here to load all core data for the main application layout.
    resolve: { coreData: coreDataResolver },
    children: [
      {
        // Homepage
        path: '', // The root path (e.g., http://localhost:4200/)
        loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent),
        title: 'Home',
      },
      {
        // Profile Page (Profile, Skills)
        path: 'profile',
        title: 'Profile',
        children: [
          {
            // Views
            path: '',
            loadComponent: () => import('./pages/profile/profile').then(m => m.ProfileComponent),
          },
          {
            // Sub Header
            path: '',
            loadComponent: () => import('./pages/profile/components/profile-subheader/profile-subheader').then(m => m.ProfileSubheaderComponent),
            outlet: 'subheader',
          },
        ]
      },
      {
        // Resume Page (Overview, Education, Experience)
        path: 'resume',
        title: 'Resume',
        children: [
          {
            // Views
            path: '',
            loadComponent: () => import('./pages/resume/resume').then(m => m.ResumeComponent),
          },
          {
            // Sub Header
            path: '',
            loadComponent: () => import('./pages/resume/components/resume-subheader/resume-subheader').then(m => m.ResumeSubheaderComponent),
            outlet: 'subheader',
          },
        ]
      },
      {
        // Expertise Page
        path: 'expertise',
        title: 'Expertise',
        // Lazy-load the testimonials component
        loadComponent: () => import('./pages/expertise/expertise').then(m => m.ExpertiseComponent),
      },
      {
        // Portfolio Page
        path: 'portfolio',
        title: 'Portfolio', // This will be the parent breadcrumb
        children: [
          {
            // Main Page of Portfolio (Portfolio Items)
            path: '',
            // The list component now lives at the empty path.
            // No title is needed here, as the parent provides it.
            loadComponent: () => import('./pages/portfolio/portfolio').then(m => m.PortfolioComponent),
            pathMatch: 'full',
          },
          {
            // Selected Portfolio Page
            path: ':id_portfolio', // This becomes a parent route for details and case study.
            title: portfolioTitleResolver,
            resolve: {
              breadcrumb: portfolioBreadcrumbResolver
            },
            children: [
              {
                // Main Page of Selected Portfolio
                path: '', // The default view for /portfolio/:id
                loadComponent: () => import('./pages/portfolio/selected-portfolio/selected-portfolio').then(m => m.SelectedPortfolioComponent),
              },
              {
                // Case Study Page
                path: 'case-study', // The new case study route
                title: portfolioCaseStudyTitleResolver, // Use the new resolver for a specific title
                data: {
                  breadcrumb: 'Studi Kasus' // Static breadcrumb label for this segment
                },
                children: [
                  {
                    path: '',
                    loadComponent: () => import('./pages/portfolio/case-study/case-study').then(m => m.CaseStudyComponent),
                  },
                  {
                    path: '',
                    loadComponent: () =>
                      import(
                        './pages/portfolio/components/portfolio-case-study-subheader/portfolio-case-study-subheader'
                      ).then(m => m.PortfolioCaseStudySubheaderComponent),
                    outlet: 'subheader',
                  },
                ]
              }
            ]
          },
        ],
      },
      {
        // Blog Page (Will be removed later if not used)
        path: 'blog',
        title: 'Blog',
        children: [
          {
            // Main Page of Blog (Blog List)
            path: '',
            loadComponent: () => import('./pages/blog/blog-list/blog-list').then(m => m.BlogListComponent),
            pathMatch: 'full',
          },
          {
            // Selected Blog Page (Blog Post)
            path: ':id_blog',
            title: blogPostTitleResolver,
            loadComponent: () => import('./pages/blog/blog-post/blog-post').then(m => m.BlogPostComponent),
          }
        ]
      },
      {
        // Testimonials Page
        path: 'testimonials',
        title: 'Testimonials',
        // Lazy-load the testimonials component
        loadComponent: () => import('./pages/testimonials/testimonials').then(m => m.TestimonialsComponent),
      },
      {
        // Contact Page
        path: 'contact',
        // Lazy-load the contact feature's routes
        loadChildren: () => import('./pages/contact/contact.routes').then(m => m.CONTACT_ROUTES),
      },
    ]
  },
  {
    // Not Found Page (404)
    path: 'not-found',
    loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFoundComponent),
    title: '404 Not Found',
    data: { noSuffix: true },
  },
  {
    // Wildcard Route
    path: '**', // Wildcard route for any path that doesn't match
    pathMatch: 'full',
    redirectTo: 'not-found'
  }
];
