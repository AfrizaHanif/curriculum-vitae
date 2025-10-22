import { Injectable } from '@angular/core';
import { HobbyData } from '../../models/profile';
import { BaseDataService } from './base-data';

@Injectable({
  providedIn: 'root',
})
export class HobbyService extends BaseDataService<HobbyData> {
  /**
   * Public readonly signal for components to consume hobby data.
   * This is an alias for the generic `data` signal in the base service.
   */
  public readonly hobbies = this.data;

  constructor() {
    // The endpoint 'hobbies' and the ID key 'id_hobby' are passed to the base service.
    super('hobbies', 'id_hobby');
  }
}
