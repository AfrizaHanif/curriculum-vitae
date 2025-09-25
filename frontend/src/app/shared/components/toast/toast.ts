import { Component, computed, ElementRef, EventEmitter, inject, input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Toast as BsToast } from 'bootstrap';
import { Toast } from '../../../core/services/toast';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header" [ngClass]="headerClass()">
        <strong class="me-auto">{{ title() }}</strong>
        <button type="button" class="btn-close" (click)="close.emit()" aria-label="Close"></button>
      </div>
      <div class="toast-body">{{ toast().message }}</div>
    </div>
  `,
})
export class ToastComponent implements OnInit {
  toast = input.required<Toast>();
  @Output() close = new EventEmitter<void>();

  private elementRef = inject(ElementRef);
  private bsToast: BsToast | null = null;

  ngOnInit(): void {
    const toastEl = this.elementRef.nativeElement.querySelector('.toast');
    this.bsToast = BsToast.getOrCreateInstance(toastEl, {
      autohide: this.toast().duration !== 0,
      delay: this.toast().duration,
    });

    toastEl.addEventListener('hidden.bs.toast', () => this.close.emit());
    this.bsToast.show();
  }

  readonly title = computed(() => {
    const type = this.toast().type;
    return type.charAt(0).toUpperCase() + type.slice(1);
  });

  readonly headerClass = computed(() => ({
    'text-bg-success': this.toast().type === 'success',
    'text-bg-danger': this.toast().type === 'error',
    'text-bg-warning': this.toast().type === 'warning',
    'text-bg-info': this.toast().type === 'info',
  }));
}
