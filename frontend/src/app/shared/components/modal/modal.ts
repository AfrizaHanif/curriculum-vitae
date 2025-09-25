import { CommonModule } from '@angular/common';
import { Component, computed, contentChild, ElementRef, input } from '@angular/core';

export type ModalSize = 'sm' | 'lg' | 'xl' | 'fullscreen' | string;

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './modal.html',
  styleUrl: './modal.css'
})
export class ModalComponent {
  // Input properties for the modal component
  // isOpen = input(false);
  id = input.required<string>();
  title = input.required<string>();
  subtitle = input<string>();
  size = input<ModalSize>();
  centered = input(false, { transform: (value: boolean | string) => value === '' || value === true });
  scrollable = input(false, { transform: (value: boolean | string) => value === '' || value === true });
  backdrop = input<boolean | 'static'>(true);
  zIndex = input<number | null>(null);

  // Check for projected title content
  private readonly projectedTitle = contentChild<ElementRef>('projectedTitle');
  readonly hasProjectedTitle = computed(() => !!this.projectedTitle()?.nativeElement.childNodes.length);

  // Computed property to determine the CSS classes for the modal dialog
  readonly dialogClasses = computed(() => {
    const size = this.size(); // Get the current value of size
    // Define classes based on size, centered, and scrollable properties
    const classes: { [key: string]: boolean } = {
      'modal-dialog-scrollable': this.scrollable(),
      'modal-dialog-centered': this.centered(),
      'modal-sm': size === 'sm',
      'modal-lg': size === 'lg',
      'modal-xl': size === 'xl',
    };
    // Handle fullscreen sizes
    if (size?.startsWith('fullscreen')) {
      classes[`modal-${size}`] = true;
    }
    return classes;
  });
}
