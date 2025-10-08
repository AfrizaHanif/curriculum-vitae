import { CommonModule } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { ModalComponent } from "../../../../shared/components/modal/modal";
import { ImageFallbackDirective } from '../../../../shared/directives/image-fallback';
import { PdfViewerComponent } from "../../../../shared/components/pdf-viewer/pdf-viewer";

@Component({
  selector: 'app-certification-modal',
  standalone: true,
  imports: [CommonModule, ModalComponent, ImageFallbackDirective, PdfViewerComponent],
  templateUrl: './certification-modal.html',
  styleUrl: './certification-modal.css'
})
export class CertificationModal {
  // --- Inputs ---
  id = input.required<string>();
  name = input.required<string>();
  issuer = input.required<string>();
  issueDate = input.required<string>();
  credentialId = input<string>();
  credentialUrl = input<string>();
  file = input<string>();

  // Computed property
  readonly isPdf = computed(() => this.file()?.toLowerCase().endsWith('.pdf'));

  // --- State for copy to clipboard ---
  readonly isCopied = signal(false);

  // --- State for PDF loading ---
  readonly isPdfLoading = signal(true);

  // --- Methods ---
  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.isCopied.set(true);
      setTimeout(() => {
        this.isCopied.set(false);
      }, 2000); // Reset after 2 seconds
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }
}
