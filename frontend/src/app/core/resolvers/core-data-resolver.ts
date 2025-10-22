import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { ProfileService } from '../services/data/profile';
import { EducationService } from '../services/data/education';
import { ExperienceService } from '../services/data/experience';
import { CertificationService } from '../services/data/certification';
import { PortfolioService } from '../services/data/portfolio';
import { BlogService } from '../services/data/blog';
import { TestimonialService } from '../services/data/testimonial';
import { SocialService } from '../services/data/social';
import { ExpertiseService } from '../services/data/expertise';
import { SetupService } from '../services/data/setup';
import { ProjectService } from '../services/data/project';
import { ServiceDataService } from '../services/data/service';

/**
 * A route resolver that ensures all core application data is loaded before any
 * main route is activated. It uses forkJoin to make parallel requests.
 */
export const coreDataResolver: ResolveFn<boolean> = (): Observable<boolean> => {
  const profileService = inject(ProfileService);
  const setupService = inject(SetupService);
  const educationService = inject(EducationService);
  const experienceService = inject(ExperienceService);
  const certificationService = inject(CertificationService);
  const expertiseService = inject(ExpertiseService);
  const serviceDataService = inject(ServiceDataService);
  const portfolioService = inject(PortfolioService);
  const projectService = inject(ProjectService);
  const blogService = inject(BlogService);
  const testimonialService = inject(TestimonialService);
  const socialService = inject(SocialService);

  // forkJoin waits for all observables to complete and emits their last values as an array.
  return forkJoin([
    profileService.dataLoaded(),
    setupService.dataLoaded(),
    educationService.dataLoaded(),
    experienceService.dataLoaded(),
    certificationService.dataLoaded(),
    expertiseService.dataLoaded(),
    serviceDataService.dataLoaded(),
    portfolioService.dataLoaded(),
    projectService.dataLoaded(),
    blogService.dataLoaded(),
    testimonialService.dataLoaded(),
    socialService.dataLoaded(),
  ]).pipe(map(() => true)); // Once all are done, emit true to allow route activation.
};
