import { Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageFallbackDirective } from '../../../../shared/directives/image-fallback';
import { CertificationModal } from '../certification-modal/certification-modal';
import { PdfThumbnailDirective } from '../../../../shared/directives/pdf-thumbnail';

@Component({
  selector: 'app-certification-card',
  standalone: true,
  imports: [CommonModule, ImageFallbackDirective, CertificationModal, PdfThumbnailDirective],
  templateUrl: './certification-card.html',
  styleUrl: './certification-card.css'
})
export class CertificationCardComponent {
  id = input.required<string>();
  name = input.required<string>();
  issuer = input.required<string>();
  issueDate = input.required<string>();
  credentialId = input<string>();
  credentialUrl = input<string>();
  file = input<string>();

  // Computed properties
  readonly modalId = computed(() => `cert-card-modal-${this.id()}`);
  readonly isPdf = computed(() => this.file()?.toLowerCase().endsWith('.pdf'));

  // --- State for PDF loading ---
  readonly isPdfLoading = signal(true);
}
