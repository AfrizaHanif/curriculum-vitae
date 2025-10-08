import { Directive, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocumentProxy, PDFPageProxy, RenderTask } from 'pdfjs-dist';
import type { RenderParameters } from 'pdfjs-dist/types/src/display/api';

@Directive({
  selector: '[appPdfThumbnail]',
  standalone: true,
})
export class PdfThumbnailDirective implements OnChanges {
  @Input('appPdfThumbnail') pdfUrl: string | undefined;
  @Output() loadingStateChange = new EventEmitter<boolean>();

  constructor(private el: ElementRef<HTMLCanvasElement>) {
    // Set the workerSrc only once. The path should be relative to the deployed application's root.
    // By copying the worker to assets, we ensure it's always available at this path.
    if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = `assets/pdf.worker.js`;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pdfUrl'] && this.pdfUrl) {
      this.loadPdf(this.pdfUrl);
    }
  }

  private async loadPdf(url: string): Promise<void> {
    this.loadingStateChange.emit(true);
    try {
      const loadingTask: pdfjsLib.PDFDocumentLoadingTask = pdfjsLib.getDocument(url);
      const pdf: PDFDocumentProxy = await loadingTask.promise;
      const page: PDFPageProxy = await pdf.getPage(1); // Get the first page

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
      await (page.render(renderContext as RenderParameters) as RenderTask).promise;
      this.loadingStateChange.emit(false);
    } catch (error) {
      console.error('Error rendering PDF thumbnail:', error);
      this.loadingStateChange.emit(false);
    }
  }
}
