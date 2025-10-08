import { Component, computed, inject } from '@angular/core';
import { JumbotronComponent } from "../../shared/components/jumbotron/jumbotron";
import { FeatureComponent } from "../../shared/components/feature/feature";
import { CardComponent } from '../../shared/components/card/card';
import { SkillCardComponent } from '../profile/components/skill-card/skill-card';
import { EducationFeatureComponent } from "./components/education-feature/education-feature";
import { ExperienceFeatureComponent } from "./components/experience-feature/experience-feature";
import { EducationService } from '../../core/services/data/education';
import { ExperienceService } from '../../core/services/data/experience';
import { ProfileService } from '../../core/services/data/profile';
import { BootstrapDirective } from '../../shared/directives/bootstrap';
import { ScrollSpyDirective } from '../../shared/directives/scrollspy';
import { DescriptionService } from '../../core/services/description';
import { environment } from '../../../environments/environment';
import { CvViewerModalComponent } from "./components/cv-viewer-modal/cv-viewer-modal";
import { GoogleAnalyticsService } from '../../core/services/google-analytics';
import { CertificationService } from '../../core/services/certification';
import { CertificationCardComponent } from './components/certification-card/certification-card';

@Component({
  selector: 'app-resume',
  imports: [JumbotronComponent, FeatureComponent, CardComponent, SkillCardComponent, EducationFeatureComponent, ExperienceFeatureComponent, BootstrapDirective, ScrollSpyDirective, CvViewerModalComponent, CertificationCardComponent],
  templateUrl: './resume.html',
  styleUrl: './resume.css'
})
export class ResumeComponent {
  // Inject Services
  private educationService = inject(EducationService);
  private experienceService = inject(ExperienceService);
  private profileService = inject(ProfileService);
  private descriptionService = inject(DescriptionService);
  private certificationService = inject(CertificationService);
  private gaService = inject(GoogleAnalyticsService);

  // Get Data from Service
  educationHistory = this.educationService.educationHistory;
  experienceHistory = this.experienceService.experienceHistory;
  certifications = this.certificationService.certifications;
  skills = this.profileService.skills;
  profileData = this.profileService.profileData;
  jumbotronSubtitle = this.descriptionService.resumeJumbotronSubtitle;

  // Create a computed signal to sort skills by percentage
  sortedSkills = computed(() => {
    // Create a shallow copy and sort by percentage descending (highest first)
    return [...this.skills()].sort((a, b) => {
      return b.percent_skill - a.percent_skill;
    });
  });

  // Create a computed signal to sort the work experience
  sortedExperienceHistory = computed(() => {
    return [...this.experienceHistory()].sort((a, b) => {
      // Treat null or 'Present' finish dates as the current date for sorting
      const finishDateA = a.f_period_experience ? new Date(a.f_period_experience) : new Date();
      const finishDateB = b.f_period_experience ? new Date(b.f_period_experience) : new Date();

      // Sort by finish date descending (most recent first)
      return finishDateB.getTime() - finishDateA.getTime();
    });
  });

  // Create a computed signal to sort the education history
  sortedEducationHistory = computed(() => {
    return [...this.educationHistory()].sort((a, b) => {
      // Treat null or 'Present' finish dates as the current date for sorting
      const finishDateA = a.f_period_education ? new Date(a.f_period_education) : new Date();
      const finishDateB = b.f_period_education ? new Date(b.f_period_education) : new Date();

      // Sort by finish date descending (most recent first)
      return finishDateB.getTime() - finishDateA.getTime();
    });
  });

  // Create a computed signal to sort the certifications
  sortedCertifications = computed(() => {
    // Create a shallow copy to avoid mutating the original signal's array
    return [...this.certifications()].sort((a, b) => {
      // Primary sort: issue_date_certification descending (newest first)
      const dateComparison = new Date(b.issue_date_certification).getTime() - new Date(a.issue_date_certification).getTime();
      if (dateComparison !== 0) {
        return dateComparison;
      }
      // Secondary sort: id_certification ascending
      return a.id_certification.localeCompare(b.id_certification);
    });
  });

  constructor() {
    if (!environment.production) {
      console.log('Resume component initialized.');
    }
  }

  trackCvDownload(type: 'view' | 'download'): void {
    // Use the recommended 'file_download' event name
    this.gaService.trackEvent('file_download', {
      // You can add any parameters you find useful
      event_category: 'engagement',
      event_label: `cv_${type}`,
      file_name: 'afriza-hanif-cv.pdf',
      file_extension: 'pdf',
      link_text: 'Unduh CV'
    });
  }
}
