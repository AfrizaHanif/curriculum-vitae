import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { shareReplay, tap, catchError } from 'rxjs/operators';
import { SocialData } from '../models/social';

@Injectable({
  providedIn: 'root',
})
export class SocialService {
  private http = inject(HttpClient); // Inject HttpClient for API calls
  private dataLoaded$!: Observable<SocialData[]>; // Observable to track data loading state
  private _socials = signal<SocialData[]>([]); // Private signal to hold social media data

  // Public readonly signal for components to bind to
  public readonly socials = this._socials.asReadonly();

  /**
   * Returns an observable that emits when the social media data has been loaded.
   * This is useful for resolvers or guards that need to wait for the data.
   */
  public dataLoaded(): Observable<SocialData[]> {
    if (!this.dataLoaded$) {
      this.dataLoaded$ = this.http.get<SocialData[]>(`/assets/data/socials.json`).pipe(
        tap(data => this._socials.set(data ?? [])),
        shareReplay(1),
        catchError(err => {
          console.error('Failed to load social media data', err);
          return of([]); // On error (e.g., 404), return an empty array
        })
      );
    }
    return this.dataLoaded$;
  }

  /**
   * Creates new social media entries.
   */
  public create(socials: Partial<SocialData>[]): Observable<SocialData[]> {
    // This operation is not supported with static JSON files.
    console.warn('Create operation on socials is not supported with static data.');
    return throwError(() => new Error('Create operation not supported.'));
  }

  /**
   * Updates existing social media entries.
   */
  public update(socials: Partial<SocialData>[]): Observable<SocialData[]> {
    // This operation is not supported with static JSON files.
    console.warn('Update operation on socials is not supported with static data.');
    return throwError(() => new Error('Update operation not supported.'));
  }

  /**
   * Deletes a social media entry by its ID.
   */
  public delete(id: string): Observable<void> {
    // This operation is not supported with static JSON files.
    console.warn(`Delete operation on social media entry ${id} is not supported with static data.`);
    return throwError(() => new Error('Delete operation not supported.'));
  }
}
