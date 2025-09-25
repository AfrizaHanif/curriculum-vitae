import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pdf-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-viewer.html',
  styleUrls: ['./pdf-viewer.css']
})
export class PdfViewerComponent {
  pdfSrc = input.required<string>();

  private sanitizer = inject(DomSanitizer);

  pdfUrl = computed<SafeResourceUrl | null>(() => {
    const src = this.pdfSrc();
    if (src) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(src);
    }
    return null;
  });
}
