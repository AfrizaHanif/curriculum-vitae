import { Injectable } from '@angular/core';
import { CertificationData } from '../../models/certification';
import { BaseDataService } from './base-data';

@Injectable({
  providedIn: 'root'
})
export class CertificationService extends BaseDataService<CertificationData> {
  /**
   * Public readonly signal for components to consume certification data.
   * This is an alias for the generic `data` signal in the base service.
   */
  public readonly certifications = this.data;

  constructor() {
    // The endpoint 'certifications' and the ID key 'id_certification' are passed to the base service.
    super('certifications', 'id_certification');
  }
}
