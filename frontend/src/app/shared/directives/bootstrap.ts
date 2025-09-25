import { Directive, ElementRef, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
import { Tooltip, Popover, Dropdown, Toast, Collapse, Modal, Offcanvas } from 'bootstrap';

// A type for all possible Bootstrap component constructor types we handle
type BootstrapInstance = Tooltip | Popover | Dropdown | Toast | Collapse | Modal | Offcanvas;

@Directive({
  selector: '[appBootstrap]',
  standalone: true,
})
export class BootstrapDirective implements AfterViewInit, OnDestroy {
  private instances: BootstrapInstance[] = [];

  constructor(private el: ElementRef<HTMLElement>, private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    // Run all initializations outside of Angular's zone to prevent
    // unnecessary change detection cycles from events like scroll or mouseover.
    this.ngZone.runOutsideAngular(() => {
      this.initialize('[data-bs-toggle="tooltip"]', Tooltip);
      this.initialize('[data-bs-toggle="popover"]', Popover);
      this.initialize('[data-bs-toggle="dropdown"]', Dropdown);
      this.initialize('.toast', Toast, true);
      this.initialize('[data-bs-toggle="collapse"]', Collapse, true);
      this.initialize('[data-bs-toggle="modal"]', Modal, true);
      this.initialize('[data-bs-toggle="offcanvas"]', Offcanvas, true);
    });
  }

  ngOnDestroy(): void {
    // Dispose of all created instances to prevent memory leaks
    this.instances.forEach(instance => instance?.dispose());
  }

  /**
   * Initializes Bootstrap components based on the provided selector and component type.
   * @param selector The CSS selector to find elements to initialize.
   */
  private initialize(selector: string, BsComponent: any, useTarget = false): void {
    const list = this.el.nativeElement.querySelectorAll(selector);
    list.forEach((el: Element) => {
      const targetEl = useTarget ? (document.querySelector(el.getAttribute('data-bs-target') || el.getAttribute('href')!) || el) : el;
      const options = BsComponent === Collapse ? { toggle: false } : {};
      this.instances.push(BsComponent.getOrCreateInstance(targetEl, options));
    })
  }
}
