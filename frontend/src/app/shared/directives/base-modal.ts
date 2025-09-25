import { Directive, input } from '@angular/core';
import { ModalSize } from '../components/modal/modal';

/**
 * An abstract directive to provide common inputs for modal components.
 */
@Directive()
export abstract class BaseModalDirective {
  size = input<ModalSize>(); // Optional size input for the modal

  // Boolean Inputs with transformation to handle presence of attribute as true
  centered = input(false, { transform: (value: boolean | string) => value === '' || value === true });
  scrollable = input(false, { transform: (value: boolean | string) => value === '' || value === true });
}
