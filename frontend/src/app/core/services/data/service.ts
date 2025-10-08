import { Injectable } from '@angular/core';
import { BaseDataService } from './base-data';
import { ServiceData } from '../../models/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceDataService extends BaseDataService<ServiceData> {
  /**
   * Public readonly signal for components to consume service data.
   */
  public readonly services = this.data;

  constructor() {
    super('services', 'id_service');
  }
}

