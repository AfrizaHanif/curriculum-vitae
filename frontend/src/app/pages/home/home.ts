import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { JumbotronComponent } from '../../shared/components/jumbotron/jumbotron';
import { ProfileService } from '../../core/services/profile';
import { DescriptionService } from '../../core/services/description';
import { environment } from '../../../environments/environment';
import { ImageFallbackDirective } from '../../shared/directives/image-fallback';

@Component({
  selector: 'app-home',
  imports: [JumbotronComponent, RouterLink, ImageFallbackDirective],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  // Inject Services
  private profileService = inject(ProfileService);
  private descriptionService = inject(DescriptionService);

  // Inject from Angular
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  // Signals to control the state of the child form component
  logoutMessage = signal<string | null>(null);

  // This signal is already used in your template for the name
  profileData = this.profileService.profileData; // Get Profile Data from Service
  jumbotronSubtitle = this.descriptionService.homeJumbotronSubtitle;

  constructor() {
    if (!environment.production) {
      console.log('Home component initialized.');
    }
  }
}
