import { Directive, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';

@Directive({
  selector: '[appPdfThumbnail]',
  standalone: true,
})
export class PdfThumbnailDirective implements OnChanges {
  @Input('appPdfThumbnail') pdfUrl: string | undefined;
  @Output() loadingStateChange = new EventEmitter<boolean>();

  constructor(private el: ElementRef<HTMLCanvasElement>) {
    // The worker is needed for pdf.js to run in a separate thread.
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'assets/pdf.worker.mjs';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pdfUrl'] && this.pdfUrl) {
      this.loadPdf(this.pdfUrl);
    }
  }

  private async loadPdf(url: string): Promise<void> {
    this.loadingStateChange.emit(true);
    try {
      const loadingTask = pdfjsLib.getDocument(url);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1); // Get the first page

      const canvas = this.el.nativeElement;
      const context = canvas.getContext('2d');
      if (!context) {
        throw new Error('Could not get 2D context from canvas');
      }

      const parent = canvas.parentElement;
      if (!parent) {
        return;
      }

      // Adjust scale to cover the container while maintaining aspect ratio
      const viewport = page.getViewport({ scale: 1 });
      const parentWidth = parent.clientWidth;
      const parentHeight = parent.clientHeight;

      const scaleX = parentWidth / viewport.width;
      const scaleY = parentHeight / viewport.height;
      const scale = Math.max(scaleX, scaleY); // Use max to "cover"

      const scaledViewport = page.getViewport({ scale });

      // Center the canvas content
      canvas.height = parentHeight;
      canvas.width = parentWidth;

      const renderContext = {
        canvas: canvas,
        viewport: scaledViewport,
      };
      await page.render(renderContext).promise;
      this.loadingStateChange.emit(false);
    } catch (error) {
      console.error('Error rendering PDF thumbnail:', error);
      this.loadingStateChange.emit(false);
    }
  }
}
