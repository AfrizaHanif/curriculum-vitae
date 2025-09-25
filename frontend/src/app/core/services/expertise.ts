import { Injectable } from '@angular/core';
import { BaseDataService } from './base-data';
import { ExpertiseData } from '../models/expertise';

@Injectable({
  providedIn: 'root'
})
export class ExpertiseService extends BaseDataService<ExpertiseData> {
  /**
   * Public readonly signal for components to consume expertise data.
   * This is an alias for the generic `data` signal in the base service.
   */
  public readonly expertise = this.data;

  constructor() {
    // The endpoint 'expertise' and the ID key 'id' are passed to the base service.
    super('expertise', 'id_expertise');
  }
}
