import { afterNextRender, Component, ElementRef, inject, input, OnDestroy, signal } from '@angular/core';
import { ModalComponent } from '../../../../shared/components/modal/modal';
import { PdfViewerComponent } from "../../../../shared/components/pdf-viewer/pdf-viewer";
import { BaseModalDirective } from '../../../../shared/directives/base-modal';

@Component({
  selector: 'app-cv-viewer-modal',
  standalone: true,
  imports: [ModalComponent, PdfViewerComponent],
  templateUrl: './cv-viewer-modal.html',
  styleUrl: './cv-viewer-modal.css'
})
export class CvViewerModalComponent extends BaseModalDirective implements OnDestroy {
  // Set Input (String)
  id = input<string>('modal-cv-view');
  title = input<string>('CV Viewer');

  // Locate PDF Document
  private readonly initialCvPath = 'assets/documents/cv-afriza-hanif.pdf';

  cvPath = signal(this.initialCvPath); // Set Signal

  private elementRef = inject(ElementRef);
  private modalElement: HTMLElement | null = null;

  // Store listeners to remove them on destroy
  private onHiddenListener = () => {
    this.cvPath.set(''); // Unload the PDF when the modal is hidden
  };
  private onShowListener = () => {
    this.cvPath.set(this.initialCvPath); // Reload the PDF when the modal is shown
  };

  constructor() {
    super();
    // After the view is rendered, set up the modal element and event listeners
    afterNextRender(() => {
      this.modalElement = this.elementRef.nativeElement.querySelector(`#${this.id()}`);
      // Add event listeners for Bootstrap modal events
      if (this.modalElement) {
        this.modalElement.addEventListener('hidden.bs.modal', this.onHiddenListener);
        this.modalElement.addEventListener('show.bs.modal', this.onShowListener);
      }
    });
  }

  // Clean up event listeners when the component is destroyed
  ngOnDestroy(): void {
    // Clean up event listeners to prevent memory leaks
    if (this.modalElement) {
      this.modalElement.removeEventListener('hidden.bs.modal', this.onHiddenListener);
      this.modalElement.removeEventListener('show.bs.modal', this.onShowListener);
    }
  }
}
