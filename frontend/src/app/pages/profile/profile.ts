import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JumbotronComponent } from "../../shared/components/jumbotron/jumbotron";
import { SkillCardComponent } from "./components/skill-card/skill-card";
import { CardComponent } from "../../shared/components/card/card";
import { ProfileService } from '../../core/services/data/profile';
import { PhoneFormat } from '../../shared/pipes/phone-format-pipe';
import { SkillService } from '../../core/services/data/skill';
import { HobbyService } from '../../core/services/data/hobby';
import { DescriptionService } from '../../core/services/description';
import { EducationService } from '../../core/services/data/education';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { BackgroundImageFallbackDirective } from "../../shared/directives/background-image-fallback";
import { BootstrapDirective } from '../../shared/directives/bootstrap';
import { ScrollSpyDirective } from '../../shared/directives/scrollspy';
import { FeatureComponent } from '../../shared/components/feature/feature';
import { HobbiesFeature } from "./components/hobbies-feature/hobbies-feature";

@Component({
  selector: 'app-profile',
  imports: [CommonModule, JumbotronComponent, SkillCardComponent, CardComponent, PhoneFormat, BackgroundImageFallbackDirective, BootstrapDirective, ScrollSpyDirective, FeatureComponent, HobbiesFeature],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class ProfileComponent {
  // Inject Services
  private profileService = inject(ProfileService);
  private skillService = inject(SkillService);
  private hobbyService = inject(HobbyService);
  private educationService = inject(EducationService);
  private descriptionService = inject(DescriptionService);
  // private router = inject(Router);

  // Get Profile and Skills Data from Service
  profileData = this.profileService.profileData;
  skills = this.skillService.skills;
  hobbies = this.hobbyService.hobbies;

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
      // console.log('Profile component initialized.');
    }
  }

  // viewPdf(): void {
  //   this.router.navigate(['/cv-viewer']);
  // }
}
