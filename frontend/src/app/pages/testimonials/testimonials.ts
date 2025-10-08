import { Component, inject, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JumbotronComponent } from '../../shared/components/jumbotron/jumbotron';
import { TestimonialService } from '../../core/services/data/testimonial';
import { PortfolioService } from '../../core/services/data/portfolio';
import { DescriptionService } from '../../core/services/description';
import { ImageFallbackDirective } from '../../shared/directives/image-fallback';
import { TestimonialData } from '../../core/models/testimonial';
import { PortfolioData } from '../../core/models/portfolio';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [
    CommonModule,
    JumbotronComponent,
    RouterLink,
    ImageFallbackDirective
  ],
  templateUrl: './testimonials.html',
  styleUrls: ['./testimonials.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialsComponent {
  // Inject Services
  private testimonialService = inject(TestimonialService);
  private portfolioService = inject(PortfolioService);
  private descriptionService = inject(DescriptionService);

  // Raw data signals
  private testimonials = this.testimonialService.testimonials;
  private portfolios = this.portfolioService.portfolios;
  jumbotronSubtitle = this.descriptionService.testimonialsJumbotronSubtitle;

  // A computed signal that combines testimonials with their associated projects.
  // This is more efficient as it only recalculates when testimonials or portfolios change.
  testimonialsWithProjects = computed(() => {
    const allPortfolios = this.portfolios();
    return this.testimonials().map(testimonial => {
      const projects = testimonial.id_portfolio
        ?.map(id => allPortfolios.find(p => p.id_portfolio === id))
        .filter((p): p is PortfolioData => !!p) ?? [];

      return { ...testimonial, projects };
    });
  });
}
