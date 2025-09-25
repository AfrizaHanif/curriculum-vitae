import { Directive, ElementRef, NgZone, OnDestroy, effect, input } from '@angular/core';
import { Tooltip } from 'bootstrap';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective implements OnDestroy {
  // The main input can be the tooltip title itself
  title = input<string>('', { alias: 'appTooltip' });

  // A secondary input for all other Bootstrap Tooltip options
  tooltipOptions = input<Partial<Tooltip.Options>>();

  private tooltip: Tooltip | null = null;

  constructor(private el: ElementRef<HTMLElement>, private ngZone: NgZone) {
    effect((onCleanup) => {
      const title = this.title();
      const options = this.tooltipOptions();

      this.ngZone.runOutsideAngular(() => {
        if (!title) {
          this.tooltip?.dispose();
          this.tooltip = null;
          return;
        }

        const combinedOptions: Partial<Tooltip.Options> = { title, ...options };

        this.tooltip ? this.tooltip.setContent({ '.tooltip-inner': title }) : this.tooltip = new Tooltip(this.el.nativeElement, combinedOptions);
      });

      onCleanup(() => {
        this.tooltip?.dispose();
      });
    });
  }

  ngOnDestroy(): void {
    // The effect's onCleanup function handles disposal now.
  }
}

