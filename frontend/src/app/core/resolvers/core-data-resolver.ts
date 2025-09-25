import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { map } from 'rxjs/operators';
import { ProfileService } from '../services/profile';
import { EducationService } from '../services/education';
import { SocialService } from '../services/social';
import { PortfolioService } from '../services/portfolio';
import { ExperienceService } from '../services/experience';
import { BlogService } from '../services/blog';
import { TestimonialService } from '../services/testimonial';
import { ExpertiseService } from '../services/expertise';
import { forkJoin, Observable } from 'rxjs';

/**
 * A route resolver that ensures all core application data is loaded before any
 * main route is activated. It uses forkJoin to make parallel requests.
 */
export const coreDataResolver: ResolveFn<boolean> = (): Observable<boolean> => {
  const profileService = inject(ProfileService);
  const educationService = inject(EducationService);
  const experienceService = inject(ExperienceService);
  const socialService = inject(SocialService);
  const portfolioService = inject(PortfolioService);
  const blogService = inject(BlogService);
  const testimonialService = inject(TestimonialService);
  const expertiseService = inject(ExpertiseService);

  // forkJoin waits for all observables to complete and emits their last values as an array.
  return forkJoin([
    profileService.dataLoaded(),
    educationService.dataLoaded(),
    experienceService.dataLoaded(),
    socialService.dataLoaded(),
    portfolioService.dataLoaded(),
    blogService.dataLoaded(),
    testimonialService.dataLoaded(),
    expertiseService.dataLoaded(),
  ]).pipe(map(() => true)); // Once all are done, emit true to allow route activation.
};
