import { Component, computed, inject, input, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../../core/services/portfolio';
import { PortfolioData } from '../../../core/models/portfolio';
import { ScrollSpyDirective } from '../../../shared/directives/scrollspy';

@Component({
  selector: 'app-case-study',
  standalone: true,
  imports: [CommonModule, RouterLink, ScrollSpyDirective],
  templateUrl: './case-study.html',
  styleUrl: './case-study.css'
})
export class CaseStudyComponent {
  // The router will bind the 'id' from the parent route's URL to this input.
  id_portfolio = input.required<string>();

  private portfolioService = inject(PortfolioService);

  // A computed signal that finds the portfolio item based on the ID.
  portfolioItem: Signal<PortfolioData | undefined> = computed(() => {
    return this.portfolioService.getPortfolioItemById(this.id_portfolio());
  });
}
