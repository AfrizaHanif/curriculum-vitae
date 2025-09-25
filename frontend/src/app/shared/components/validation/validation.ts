import { Component, computed, DestroyRef, effect, inject, input, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-validation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validation.html',
  styleUrl: './validation.css'
})
export class ValidationComponent {
  private destroyRef = inject(DestroyRef);

  control = input<AbstractControl | FormControl | null>();
  controlName = input<string>('This field');

  // Internal signals to reactively track control state
  private readonly isInvalid = signal(false);
  private readonly isDirty = signal(false);
  private readonly isTouched = signal(false);
  private readonly controlErrors = signal<ValidationErrors | null>(null);

  private readonly errorMessages: { [key: string]: (params: any) => string } = {
    required: () => `${this.controlName()} is required.`,
    requiredtrue: () => `You must check this box to continue.`,
    email: () => `Please enter a valid email address.`,
    min: (params: { min: number }) => `Value must be at least ${params.min}.`,
    max: (params: { max: number }) => `Value cannot be more than ${params.max}.`,
  };

  constructor() {
    effect((onCleanup) => {
      const ctrl = this.control();

      if (ctrl) {
        // Use an effect to subscribe to control events and update internal signals.
        // `takeUntilDestroyed` will automatically clean up the subscription.
        const sub = ctrl.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
          this.isInvalid.set(ctrl.invalid);
          this.isDirty.set(ctrl.dirty);
          this.isTouched.set(ctrl.touched);
          this.controlErrors.set(ctrl.errors);
        });

        // Clean up subscription when the component is destroyed or control changes.
        onCleanup(() => sub.unsubscribe());
      }
    });
  }

  // The errors property is now a computed signal for better performance.
  readonly errors = computed(() => {
    if (this.isInvalid() && (this.isDirty() || this.isTouched())) {
      const errors = this.controlErrors();
      if (errors) {
        return Object.keys(errors).map(key => {
        // Use a more specific message for the confirmation checkbox.
          if (key === 'required' && this.controlName() === 'Persetujuan') {
            return this.errorMessages['requiredtrue'](errors[key]);
          }
          return this.errorMessages[key.toLowerCase()] ? this.errorMessages[key.toLowerCase()](errors[key]) : `Invalid input.`;
        });
      }
    }
    return [];
  });
}
