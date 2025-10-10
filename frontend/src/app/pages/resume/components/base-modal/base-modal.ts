import { Directive, OnDestroy, inject, input } from '@angular/core';
import { BaseModalDirective } from '../../../../shared/directives/base-modal';

/**
 * An abstract base class for modal components that display a map.
 * It provides common inputs and logic for initializing a Leaflet map.
 * Using @Directive() allows it to be part of the DI system and use inputs.
 */
@Directive()
export abstract class BaseModalComponent extends BaseModalDirective implements OnDestroy {
  // --- Inputs ---
  latitude = input<number | null>();
  longitude = input<number | null>();

  // --- Abstract Properties ---
  abstract getPopupText(): string;

  constructor() {
    super();
  }

  ngOnDestroy(): void {
  }
}
