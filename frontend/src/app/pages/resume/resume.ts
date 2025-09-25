import { Component, inject } from '@angular/core';
import { JumbotronComponent } from "../../shared/components/jumbotron/jumbotron";
import { FeatureComponent } from "../../shared/components/feature/feature";
import { EducationFeatureComponent } from "./components/education-feature/education-feature";
import { ExperienceFeatureComponent } from "./components/experience-feature/experience-feature";
import { EducationService } from '../../core/services/education';
import { ExperienceService } from '../../core/services/experience';
import { ProfileService } from '../../core/services/profile';
import { BootstrapDirective } from '../../shared/directives/bootstrap';
import { ScrollSpyDirective } from '../../shared/directives/scrollspy';
import { DescriptionService } from '../../core/services/description';
import { environment } from '../../../environments/environment';
import { CvViewerModalComponent } from "../profile/components/cv-viewer-modal/cv-viewer-modal";

@Component({
  selector: 'app-resume',
  imports: [JumbotronComponent, FeatureComponent, EducationFeatureComponent, ExperienceFeatureComponent, BootstrapDirective, ScrollSpyDirective, CvViewerModalComponent],
  templateUrl: './resume.html',
  styleUrl: './resume.css'
})
export class ResumeComponent {
  // Inject Services
  private educationService = inject(EducationService);
  private experienceService = inject(ExperienceService);
  private profileService = inject(ProfileService);
  private descriptionService = inject(DescriptionService);

  // Get Data from Service
  educationHistory = this.educationService.educationHistory;
  experienceHistory = this.experienceService.experienceHistory;
  profileData = this.profileService.profileData;
  jumbotronSubtitle = this.descriptionService.resumeJumbotronSubtitle;

  constructor() {
    if (!environment.production) {
      console.log('Resume component initialized.');
    }
  }
}
