import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { JumbotronComponent } from '../../shared/components/jumbotron/jumbotron';
import { ProfileService } from '../../core/services/data/profile';
import { DescriptionService } from '../../core/services/description';
import { environment } from '../../../environments/environment';
import { ImageFallbackDirective } from '../../shared/directives/image-fallback';
import { PortfolioService } from '../../core/services/data/portfolio';

@Component({
  selector: 'app-home',
  imports: [JumbotronComponent, RouterLink, ImageFallbackDirective],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  // Inject Services
  private profileService = inject(ProfileService);
  private descriptionService = inject(DescriptionService);
  private portfolioService = inject(PortfolioService);

  // Signals to control the state of the child form component
  logoutMessage = signal<string | null>(null);

  // This signal is already used in your template for the name
  profileData = this.profileService.profileData; // Get Profile Data from Service
  jumbotronSubtitle = this.descriptionService.homeJumbotronSubtitle;

  // New computed signal to get up to 3 featured projects
  featuredProjects = computed(() => {
    return this.portfolioService.portfolios()
      .filter(p => p.is_featured)
      .slice(0, 3); // We'll show a maximum of 3 projects
  });

  constructor() {
    if (!environment.production) {
      // console.log('Home component initialized.');
    }
  }
}
