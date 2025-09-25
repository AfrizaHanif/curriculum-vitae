import { Injectable } from '@angular/core';
import { BaseDataService } from './base-data';

export interface Testimonial {
  id_testimonial: string;
  author_testimonial: string;
  role_testimonial: string;
  company_testimonial: string;
  avatar_testimonial: string;
  quote_testimonial: string;
}

@Injectable({
  providedIn: 'root'
})
export class TestimonialService extends BaseDataService<Testimonial> {
  /**
   * Public readonly signal for components to consume testimonial data.
   * This is an alias for the generic `data` signal in the base service.
   */
  public readonly testimonials = this.data;

  constructor() {
    // The endpoint 'testimonials' and the ID key 'id' are passed to the base service.
    super('testimonials', 'id');
  }
}
