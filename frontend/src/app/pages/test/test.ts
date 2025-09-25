import { Component, ElementRef, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { BootstrapDirective } from '../../shared/directives/bootstrap';
import { TooltipDirective } from '../../shared/directives/tooltip';
import { Toast, Tooltip } from 'bootstrap';

@Component({
  selector: 'app-test',
  // Import both directives. appBootstrap handles the ScrollSpy,
  // and appTooltip will handle our new button.
  imports: [BootstrapDirective, TooltipDirective],
  standalone: true,
  templateUrl: './test.html',
  styleUrl: './test.css'
})
export class TestComponent implements OnDestroy {
  progress = 0;
  @ViewChild('liveToast') liveToast!: ElementRef<HTMLDivElement>;

  private intervalId?: number;

  myTooltipOptions: Partial<Tooltip.Options> = {
    placement: 'bottom',
    customClass: 'my-custom-tooltip-class',
    trigger: 'hover focus',
  };

  constructor(private ngZone: NgZone) {}

  startProgress(): void {
    // Step 1: Run the frequent task (setInterval) outside of Angular's zone.
    this.ngZone.runOutsideAngular(() => {
      this.intervalId = window.setInterval(() => {
        const newProgress = this.progress + 1;

        // Step 2: When we need to update the UI, re-enter the zone with ngZone.run().
        this.ngZone.run(() => {
          this.progress = newProgress > 100 ? 0 : newProgress;
        });

        // If we did this instead, the UI would NOT update:
        // this.progress = newProgress > 100 ? 0 : newProgress;

      }, 50);
    });
  }

  ngOnDestroy(): void {
    // Clean up the interval when the component is destroyed.
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  showToast(): void {
    // The directive has already initialized the toast, so we can just get the instance.
    const toastInstance = Toast.getInstance(this.liveToast.nativeElement);
    toastInstance?.show();
  }
}
