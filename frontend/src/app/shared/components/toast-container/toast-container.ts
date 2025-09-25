import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast';
import { ToastComponent } from '../toast/toast';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule, ToastComponent],
  template: `
    <div class="toast-container position-fixed top-0 end-0 p-3">
      @for (toast of toastService.toasts(); track toast.id) {
        <app-toast [toast]="toast" (close)="toastService.remove(toast.id)" />
      }
    </div>
  `,
  styles: ' .toast-container { z-index: 1200; } ',
})
export class ToastContainerComponent {
  toastService = inject(ToastService);
}
