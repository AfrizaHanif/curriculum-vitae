import { Injectable } from '@angular/core';
import { SetupCategory } from '../../models/setup';
import { BaseDataService } from './base-data';

@Injectable({
  providedIn: 'root',
})
export class SetupService extends BaseDataService<SetupCategory> {
  /**
   * A readonly signal of the setup data categories.
   * This is an alias for the generic `data` signal in the base service.
   */
  public readonly setupData = this.data;

  constructor() {
    // The endpoint 'setup' is passed to the base service.
    // The idKey 'name' is used for the trackBy in the component's template.
    super('setup', 'name');
  }
}

