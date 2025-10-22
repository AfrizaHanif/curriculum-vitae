import {
  Component,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificationService } from '../../../../core/services/data/certification';

@Component({
  selector: 'app-resume-subheader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume-subheader.html',
  styleUrl: './resume-subheader.css',
})
export class ResumeSubheaderComponent {
  certificationService = inject(CertificationService);
  certifications = this.certificationService.certifications;
}
