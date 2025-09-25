import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Represents the type of action for the confirmation button.
 * This determines the button's color styling.
 */
export type ActionType = 'primary' | 'danger' | 'warning' | 'info' | 'success';

/**
 * The possible outcomes of a confirmation dialog.
 */
export type ConfirmationResult = 'confirm' | 'cancel' | 'save';

/**
 * Represents the options for a confirmation dialog.
 */
export interface ConfirmationOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  saveAndLeaveText?: string;
  actionType?: ActionType;
  onConfirm?: () => Promise<boolean>;
  onSaveAndLeave?: () => Promise<boolean>;
}

/**
 * Represents the state of the confirmation dialog, including the
 * message to display and the function to resolve the promise.
 */
export interface ConfirmationState extends ConfirmationOptions {
  resolve: (value: ConfirmationResult) => void;
}

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  private state = new Subject<ConfirmationState | null>();
  /** Observable state for the confirmation dialog component to subscribe to. */
  state$ = this.state.asObservable();

  /**
   * Triggers a confirmation dialog and returns a promise that resolves with the user's choice.
   * @param options The options for the confirmation dialog, or just the message string.
   * @returns A promise that resolves to `true` (confirm) or `false` (cancel).
   */
  confirm(options: ConfirmationOptions | string): Promise<ConfirmationResult> {
    const opts: ConfirmationOptions =
      typeof options === 'string' ? { message: options } : options;
    return new Promise((resolve) => {
      this.state.next({ ...opts, resolve });
    });
  }

  /**
   * Hides the confirmation dialog by emitting a null state.
   */
  hide(): void {
    this.state.next(null);
  }
}
