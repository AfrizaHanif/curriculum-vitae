import { Routes } from '@angular/router';
import { ContactComponent } from './contact';
import { canDeactivateFormGuard } from '../../core/guards/can-deactivate-form-guard';

export const CONTACT_ROUTES: Routes = [
  {
    path: '',
    component: ContactComponent,
    title: 'Contact Me',
    canDeactivate: [canDeactivateFormGuard],
  },
];
