import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts = signal<Toast[]>([]); // Signal to hold the list of toasts
  private nextId = 0; // Incremental ID for each toast

  /** Shows a new toast notification.
   * @param message The message to display in the toast.
   * @param type The type of toast ('success', 'error', 'info', 'warning').
   * @param duration Duration in milliseconds before the toast auto-dismisses. Set to 0 for persistent.
   */
  show(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', duration = 5000) {
    const newToast: Toast = {
      id: this.nextId++,
      message,
      type,
      duration
    };

    this.toasts.update(toasts => [...toasts, newToast]);

    if (duration > 0) {
      setTimeout(() => this.remove(newToast.id), duration);
    }
  }

  /** Removes a toast by its ID.
   * @param id The ID of the toast to remove.
   */
  remove(id: number) {
    this.toasts.update(toasts => toasts.filter(toast => toast.id !== id));
  }

  // Convenience methods for different toast types
  success(message: string, duration = 5000) { this.show(message, 'success', duration); }
  error(message: string, duration = 5000) { this.show(message, 'error', duration); }
  info(message: string, duration = 5000) { this.show(message, 'info', duration); }
  warning(message: string, duration = 5000) { this.show(message, 'warning', duration); }
}
