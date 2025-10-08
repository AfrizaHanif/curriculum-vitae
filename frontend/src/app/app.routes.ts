import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './core/layouts/public-layout/public-layout';
import { coreDataResolver } from './core/resolvers/core-data-resolver';
import { navigationGuard } from './core/guards/navigation-guard';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    // Apply the resolver here to load all core data for the main application layout.
    // Apply the guard here to protect all child routes.
    canActivate: [navigationGuard],
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
        // Lazy-load the profile feature's routes
        loadChildren: () => import('./pages/profile/profile.routes').then(m => m.PROFILE_ROUTES),
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
        // Uses Page
        path: 'setup',
        title: 'Setup',
        // Lazy-load the uses component
        loadComponent: () => import('./pages/setup/setup').then(m => m.SetupComponent),
      },
      {
        // Services Page
        path: 'services',
        title: 'Services',
        // Lazy-load the services component
        loadComponent: () => import('./pages/service/service').then(m => m.ServiceComponent),
      },
      {
        // Projects/Labs Page
        path: 'projects',
        title: 'Projects',
        // Lazy-load the projects component
        loadComponent: () => import('./pages/project/project').then(m => m.ProjectComponent),
      },
      {
        // Portfolio Page
        path: 'portfolio',
        title: 'Portfolio',
        // Lazy-load the portfolio feature's routes
        loadChildren: () => import('./pages/portfolio/portfolio.routes').then(m => m.PORTFOLIO_ROUTES),
      },
      {
        // Blog Page
        path: 'blog',
        title: 'Blog',
        // Lazy-load the blog feature's routes
        loadChildren: () => import('./pages/blog/blog.routes').then(m => m.BLOG_ROUTES),
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
