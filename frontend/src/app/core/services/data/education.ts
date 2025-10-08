import { Injectable } from '@angular/core';
import { BaseDataService } from './base-data';
import { EducationData } from '../../models/resume';

@Injectable({
  providedIn: 'root'
})
export class EducationService extends BaseDataService<EducationData> {
  /**
   * Public readonly signal for components to consume education data.
   * This is an alias for the generic `data` signal in the base service.
   */
  public readonly educationHistory = this.data;

  constructor() {
    // The endpoint 'educations' and the ID key 'id_education' are passed to the base service.
    super('educations', 'id_education');
  }
}
