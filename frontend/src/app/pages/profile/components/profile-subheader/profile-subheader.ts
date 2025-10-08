import { Component, inject } from '@angular/core';
import { ProfileService } from '../../../../core/services/data/profile';

@Component({
  selector: 'app-profile-subheader',
  standalone: true,
  imports: [],
  templateUrl: './profile-subheader.html',
})
export class ProfileSubheaderComponent {
  private profileService = inject(ProfileService);
  profileData = this.profileService.profileData;
}
