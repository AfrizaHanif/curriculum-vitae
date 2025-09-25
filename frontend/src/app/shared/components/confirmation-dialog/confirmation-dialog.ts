import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ConfirmationService,
  ConfirmationResult,
  ConfirmationState,
} from '../../../core/services/confirmation';
import {
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-dialog.html',
  styleUrls: ['./confirmation-dialog.css'],
  animations: [
    trigger('fadeBackdrop', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms ease-out', style({ opacity: 0.5 })), // Animate to Bootstrap's backdrop opacity
      ]),
      transition(':leave', [animate('150ms ease-in', style({ opacity: 0 }))]),
    ]),
    trigger('fadeDialog', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate(
          '150ms ease-out',
          style({ opacity: 1, transform: 'scale(1)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '150ms ease-in',
          style({ opacity: 0, transform: 'scale(0.95)' })
        ),
      ]),
    ]),
  ],
})
export class ConfirmationDialogComponent {
  private confirmationService = inject(ConfirmationService);
  state$: Observable<ConfirmationState | null> = this.confirmationService.state$;
  loadingAction = signal<ConfirmationResult | null>(null);

  /**
   * Resolves the dialog's promise and closes it. Used for simple actions
   * like 'Cancel'.
   * @param result The outcome of the dialog.
   * @param state The current state of the dialog.
   */
  resolveAndClose(result: ConfirmationResult, state: ConfirmationState): void {
    state.resolve(result);
    this.loadingAction.set(null); // Reset loading state when dialog is closed
    this.confirmationService.hide();
  }

  /**
   * Handles a button click that may have an asynchronous action associated with it.
   * It shows a loading state and only resolves/closes the dialog if the async
   * action completes successfully.
   * @param state The current confirmation state.
   * @param action The async function to execute.
   * @param resolveAs The result to resolve the promise with on success.
   */
  async handleAsyncAction(
    state: ConfirmationState,
    action: (() => Promise<boolean>) | undefined,
    resolveAs: ConfirmationResult
  ): Promise<void> {
    if (!action) {
      // If no async action is defined, resolve immediately.
      this.resolveAndClose(resolveAs, state);
      return;
    }
    this.loadingAction.set(resolveAs);
    try {
      const wasSuccessful = await action();
      if (wasSuccessful) {
        this.resolveAndClose(resolveAs, state);
      }
    } catch (error) {
      console.error(`Async action for '${resolveAs}' failed`, error);
      // If save fails, the dialog remains open, and navigation is blocked.
    } finally {
      this.loadingAction.set(null);
    }
  }
}
