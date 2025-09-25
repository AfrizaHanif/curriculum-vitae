import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JumbotronComponent } from '../../shared/components/jumbotron/jumbotron';
import { TestimonialService } from '../../core/services/testimonial';
import { DescriptionService } from '../../core/services/description';
import { ImageFallbackDirective } from '../../shared/directives/image-fallback';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [
    CommonModule,
    JumbotronComponent,
    ImageFallbackDirective
  ],
  templateUrl: './testimonials.html',
  styleUrls: ['./testimonials.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialsComponent {
  // Inject Services
  private testimonialService = inject(TestimonialService);
  private descriptionService = inject(DescriptionService);

  // Get data signals from the service
  testimonials = this.testimonialService.testimonials;
  jumbotronSubtitle = this.descriptionService.testimonialsJumbotronSubtitle;
}
