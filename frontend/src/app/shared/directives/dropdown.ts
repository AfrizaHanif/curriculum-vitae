import { Directive, ElementRef, NgZone, OnDestroy, effect, input } from '@angular/core';
import { Dropdown } from 'bootstrap';

/**
 * A directive to wrap Bootstrap's Dropdown functionality.
 *
 * @example
 * <button
 *   [appDropdown]
 *   [autoClose]="'outside'" // This is now reactive
 *   class="btn btn-secondary dropdown-toggle"
 *   type="button">
 *   Dropdown
 * </button>
 */
@Directive({
  selector: '[appDropdown], [data-bs-toggle="dropdown"]',
  standalone: true,
})
export class DropdownDirective implements OnDestroy {
  /**
   * Configures the auto-close behavior of the dropdown.
   */
  autoClose = input<boolean | 'inside' | 'outside'>(true);

  private dropdown: Dropdown | null = null;

  constructor(private el: ElementRef<HTMLElement>, private ngZone: NgZone) {
    effect((onCleanup) => {
      const autoCloseValue = this.autoClose();
      this.ngZone.runOutsideAngular(() => {
        // Ensure the element has the necessary attribute for Bootstrap's JS to find the menu.
        if (!this.el.nativeElement.hasAttribute('data-bs-toggle')) {
          this.el.nativeElement.setAttribute('data-bs-toggle', 'dropdown');
        }
        this.dropdown = new Dropdown(this.el.nativeElement, {
          autoClose: autoCloseValue,
        });
      });
      onCleanup(() => this.dropdown?.dispose());
    });
  }

  ngOnDestroy(): void {
    // The effect's onCleanup function handles disposal now.
  }

  // You could expose public methods to control the dropdown from a component
  show(): void {
    this.dropdown?.show();
  }

  hide(): void {
    this.dropdown?.hide();
  }

  toggle(): void {
    this.dropdown?.toggle();
  }
}
