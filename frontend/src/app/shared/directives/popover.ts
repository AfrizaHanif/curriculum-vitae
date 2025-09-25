import { Directive, ElementRef, Input, OnDestroy, NgZone, effect, input } from '@angular/core';
import { Popover } from 'bootstrap';

/**
 * A directive to wrap Bootstrap's Popover functionality.
 *
 * @example
 * <button
 *   [appPopover]="'And here\'s some amazing content. It\'s very engaging. Right?'"
 *   popoverTitle="Popover title"
 *   placement="right">
 *   Click to toggle popover
 * </button>
 */
@Directive({
  selector: '[appPopover]',
  standalone: true,
})
export class PopoverDirective implements OnDestroy {
  /**
   * The content to display in the popover body.
   */
  popoverContent = input<string>('', { alias: 'appPopover' });

  /**
   * The text to display in the popover header.
   */
  popoverTitle = input<string>('');

  /**
   * The placement of the popover.
   */
  placement = input<'auto' | 'top' | 'bottom' | 'left' | 'right'>('top');

  /**
   * How the popover is triggered. Defaults to 'click'.
   */
  trigger = input<'click' | 'hover' | 'focus' | 'manual'>('click');

  private popover: Popover | null = null;

  constructor(private el: ElementRef<HTMLElement>, private ngZone: NgZone) {
    effect((onCleanup) => {
      const content = this.popoverContent();
      if (content) {
        this.ngZone.runOutsideAngular(() => {
          this.popover = new Popover(this.el.nativeElement, {
            title: this.popoverTitle(),
            content: content,
            placement: this.placement(),
            trigger: this.trigger(),
          });
        });
        onCleanup(() => this.popover?.dispose());
      }
    });
  }

  ngOnDestroy(): void {
    // The effect's onCleanup function handles disposal now.
  }
}

