import { Injectable } from '@angular/core';
import { BaseDataService } from './base-data';
import { TestimonialData } from '../../models/testimonial';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService extends BaseDataService<TestimonialData> {
  /**
   * Public readonly signal for components to consume testimonial data.
   * This is an alias for the generic `data` signal in the base service.
   */
  public readonly testimonials = this.data;

  constructor() {
    // The endpoint 'testimonials' and the ID key 'id' are passed to the base service.
    super('testimonials', 'id_testimonial');
  }
}
