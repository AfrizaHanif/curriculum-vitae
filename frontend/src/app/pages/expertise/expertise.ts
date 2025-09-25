import { Component, computed, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JumbotronComponent } from '../../shared/components';
import { DescriptionService } from '../../core/services/description';
import { ExpertiseService } from '../../core/services/expertise';
import { PortfolioService } from '../../core/services/portfolio';
import { ExpertiseWithProjects } from '../../core/models/expertise';
import { PortfolioData } from '../../core/models/portfolio';
import { environment } from '../../../environments/environment';
import { ExpertiseFeatureComponent } from './components/expertise-feature/expertise-feature';
import { FeatureComponent } from '../../shared/components/feature/feature';

@Component({
  selector: 'app-expertise',
  standalone: true,
  imports: [CommonModule, JumbotronComponent, FeatureComponent, ExpertiseFeatureComponent],
  templateUrl: './expertise.html',
  styleUrls: ['./expertise.css']
})
export class ExpertiseComponent {
  // Inject Services
  private descriptionService = inject(DescriptionService);
  private expertiseService = inject(ExpertiseService);
  private portfolioService = inject(PortfolioService);

  // Signals from services
  private allExpertise = this.expertiseService.expertise;
  private allPortfolios = this.portfolioService.portfolios;

  // Jumbotron data
  jumbotronSubtitle = this.descriptionService.expertiseJumbotronSubtitle;

  constructor() {
    // In development, log when expertise data is loaded.
    if (!environment.production) {
      this.expertiseService.dataLoaded().subscribe(data => console.log('Expertise data loaded:', data));
    }
  }

  // Create a computed signal to join the expertise data with portfolio details
  readonly expertiseWithProjects: Signal<ExpertiseWithProjects[]> = computed(() => {
    const expertise = this.allExpertise();
    const portfolios = this.allPortfolios();

    // Don't compute until both data sources are loaded
    if (!expertise.length || !portfolios.length) {
      return [];
    }

    return expertise.map(exp => {
      // Find the full portfolio object for each related project ID
      const relatedProjectDetails = exp.related_projects
        .map(projectId => portfolios.find(p => p.id_portfolio === projectId))
        .filter((p): p is PortfolioData => p !== undefined); // Type guard to filter out undefined

      return {
        ...exp,
        relatedProjectDetails,
      };
    });
  });
}
