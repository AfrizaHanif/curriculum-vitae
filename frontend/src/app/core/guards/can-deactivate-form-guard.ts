import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

/**
 * An interface that a component can implement to be a guard deciding if a route can be deactivated.
 */
export interface CanComponentDeactivate {
  /**
   * A method that is called to decide if a route can be deactivated.
   * @returns A boolean, Promise<boolean>, or Observable<boolean> indicating if deactivation is allowed.
   */
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

/**
 * A `CanDeactivateFn` that checks for a `canDeactivate` method on the component.
 * If the method exists, it's called to determine if the route can be left.
 */
export const canDeactivateFormGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};
