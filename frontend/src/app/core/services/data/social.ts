import { Injectable } from '@angular/core';
import { SocialData } from '../../models/social';
import { BaseDataService } from './base-data';

@Injectable({
  providedIn: 'root',
})
export class SocialService extends BaseDataService<SocialData> {
  /**
   * Public readonly signal for components to consume social media data.
   * This is an alias for the generic `data` signal in the base service.
   */
  public readonly socials = this.data;

  constructor() {
    // The endpoint 'socials' and the ID key 'id_social' are passed to the base service.
    super('socials', 'id_social');
  }
}
