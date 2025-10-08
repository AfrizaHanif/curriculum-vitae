import { Routes } from '@angular/router';

export const PROFILE_ROUTES: Routes = [
  {
    // Main view for /profile
    path: '',
    loadComponent: () => import('./profile').then((m) => m.ProfileComponent),
  },
  {
    // Subheader for /profile, loaded into a named outlet
    path: '',
    loadComponent: () =>
      import('./components/profile-subheader/profile-subheader').then((m) => m.ProfileSubheaderComponent),
    outlet: 'subheader',
  },
];
