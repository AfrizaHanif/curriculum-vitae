import { Injectable } from '@angular/core';
import { BaseDataService } from './base-data';
import { ExperienceData } from '../models/resume';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService extends BaseDataService<ExperienceData> {
  /**
   * Public readonly signal for components to consume experience data.
   * This is an alias for the generic `data` signal in the base service.
   */
  public readonly experienceHistory = this.data;

  constructor() {
    // The endpoint 'experiences' and the ID key 'id_experience' are passed to the base service.
    super('experiences', 'id_experience');
  }
}
