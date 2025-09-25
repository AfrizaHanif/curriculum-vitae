import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JumbotronComponent } from "../../shared/components/jumbotron/jumbotron";
import { SkillCardComponent } from "./components/skill-card/skill-card";
import { CardComponent } from "../../shared/components/card/card";
import { ProfileService } from '../../core/services/profile';
import { PhoneFormat } from '../../shared/pipes/phone-format-pipe';
import { DescriptionService } from '../../core/services/description';
import { EducationService } from '../../core/services/education';
import { environment } from '../../../environments/environment';
import { DropdownComponent } from "../../shared/components/dropdown/dropdown";
import { Router } from '@angular/router';
import { CvViewerModalComponent } from "./components/cv-viewer-modal/cv-viewer-modal";
import { BackgroundImageFallbackDirective } from "../../shared/directives/background-image-fallback";
import { BootstrapDirective } from '../../shared/directives/bootstrap';
import { ScrollSpyDirective } from '../../shared/directives/scrollspy';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, JumbotronComponent, SkillCardComponent, CardComponent, PhoneFormat, DropdownComponent, CvViewerModalComponent, BackgroundImageFallbackDirective, BootstrapDirective, ScrollSpyDirective],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent {
  // Inject Services
  private profileService = inject(ProfileService);
  private educationService = inject(EducationService);
  private descriptionService = inject(DescriptionService);
  private router = inject(Router);

  // Get Profile and Skills Data from Service
  profileData = this.profileService.profileData;
  skills = this.profileService.skills;

  // Create a computed signal for the latest degree
  latestDegree = computed(() => {
    const educationHistory = this.educationService.educationHistory();
    if (educationHistory && educationHistory.length > 0) {
      // Assuming the first item is the most recent
      return educationHistory[0].degree_education;
    }
    return ''; // Return empty string if no education data is available
  });

  jumbotronSubtitle = this.descriptionService.profileJumbotronSubtitle; // Get Description from Service

  constructor() {
    if (!environment.production) {
      console.log('Profile component initialized.');
    }
  }

  // viewPdf(): void {
  //   this.router.navigate(['/cv-viewer']);
  // }
}
