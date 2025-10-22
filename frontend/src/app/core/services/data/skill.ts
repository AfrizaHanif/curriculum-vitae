import { Injectable } from '@angular/core';
import { SkillData } from '../../models/profile';
import { BaseDataService } from './base-data';

@Injectable({
  providedIn: 'root',
})
export class SkillService extends BaseDataService<SkillData> {
  /**
   * Public readonly signal for components to consume skill data.
   * This is an alias for the generic `data` signal in the base service.
   */
  public readonly skills = this.data;

  constructor() {
    // The endpoint 'skills' and the ID key 'id_skill' are passed to the base service.
    super('skills', 'id_skill');
  }
}
