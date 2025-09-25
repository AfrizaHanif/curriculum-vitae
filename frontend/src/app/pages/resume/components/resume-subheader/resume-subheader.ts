import {
  Component,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from '../../../../shared/components/dropdown/dropdown';
import { GoogleAnalyticsService } from '../../../../core/services/google-analytics';

@Component({
  selector: 'app-resume-subheader',
  standalone: true,
  imports: [CommonModule, DropdownComponent],
  templateUrl: './resume-subheader.html',
  styleUrl: './resume-subheader.css',
})
export class ResumeSubheaderComponent {
  private gaService = inject(GoogleAnalyticsService);

  trackCvDownload(type: 'view' | 'download'): void {
    // Use the recommended 'file_download' event name
    this.gaService.trackEvent('file_download', {
      // You can add any parameters you find useful
      event_category: 'engagement',
      event_label: `cv_${type}`,
      file_name: 'afriza-hanif-cv.pdf',
      file_extension: 'pdf',
    });
  }
}
