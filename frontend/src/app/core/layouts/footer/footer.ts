import { Component, inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

import { ProfileService } from '../../services/data/profile';
import { SocialService } from '../../services/data/social';
import { TooltipDirective } from '../../../shared/directives/tooltip';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, TooltipDirective],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class FooterComponent {
  // Inject services to access profile and social data
  private profileService = inject(ProfileService);
  private socialService = inject(SocialService);
  private document = inject(DOCUMENT);

  // Get the current year for display in the footer
  public currentYear = new Date().getFullYear();

  // Access profile and social data from the services
  public profile = this.profileService.profileData;
  public socials = this.socialService.socials;
}
