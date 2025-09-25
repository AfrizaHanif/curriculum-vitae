import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Defines the shape of the data that can be passed to the subheader.
 * This can be expanded with more properties as needed.
 */
export interface SubheaderData {
  cvUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SubheaderService {
  private subheaderData = new BehaviorSubject<SubheaderData | null>(null); // Holds the current subheader data
  public subheaderData$ = this.subheaderData.asObservable(); // Observable for components to subscribe to

  /** Updates the subheader data.
   * @param data The new subheader data to set.
   */
  public setData(data: SubheaderData) {
    this.subheaderData.next(data);
  }
}
