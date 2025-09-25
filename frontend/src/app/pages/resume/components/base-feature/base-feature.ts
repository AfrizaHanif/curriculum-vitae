import { Directive, computed, input } from '@angular/core';

/**
 * An abstract base class for feature components on the resume page.
 * It provides common inputs and logic for items like education and experience.
 * Using @Directive() allows it to be part of the DI system and use inputs.
 */
@Directive()
export abstract class BaseFeatureComponent {
  // Set Input
  id = input.required<string>();
  status = input.required<string>();
  s_period = input.required<string>();
  f_period = input<string | null>();
  description = input<string | null>();
  latitude = input<string | null>();
  longitude = input<string | null>();

  abstract readonly modalIdPrefix: string; // Prefix for modal IDs, to be defined in subclasses

  readonly modalId = computed(() => `${this.modalIdPrefix}-${this.id()}`); // Unique modal ID based on prefix and item ID
}
