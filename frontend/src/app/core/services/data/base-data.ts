import { signal, WritableSignal, inject, Signal } from '@angular/core';
import { Observable, of, tap, shareReplay, catchError, throwError, map, first } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../toast';

/**
 * An abstract base service for handling CRUD operations for a specific data type.
 * It encapsulates data fetching, caching via signals, and state management.
 *
 * @template T The data type of the items being managed. Must have an ID property.
 */
export abstract class BaseDataService<T extends { [key: string]: any }> {
  protected http = inject(HttpClient);
  protected toastService = inject(ToastService);

  // The signal that holds the array of data.
  protected readonly _data: WritableSignal<T[]> = signal<T[]>([]);

  // A private, replayable observable for caching the data stream.
  private data$?: Observable<T[]>;

  /**
   * @param endpoint The API endpoint for the data (e.g., 'educations').
   * @param idKey The name of the primary key property for the data type T (e.g., 'id_education').
   */
  constructor(protected endpoint: string, public readonly idKey: string) {}

  /**
   * Public readonly signal for components to consume the data.
   */
  public get data(): Signal<T[]> {
    return this._data.asReadonly();
  }

  /**
   * Ensures data is loaded from the API.
   * It uses a caching mechanism to avoid redundant API calls.
   * Returns an observable that emits `true` upon successful loading, suitable for resolvers.
   */
  dataLoaded(): Observable<boolean> {
    if (!this.data$) {
      this.data$ = this.http.get<T[]>(`/assets/data/${this.endpoint}.json`).pipe(
        tap(items => this._data.set(items ?? [])),
        shareReplay(1),
        catchError(error => {
          console.error(`Error loading ${this.endpoint}:`, error);
          this.toastService.show(`Failed to load ${this.endpoint} data.`, 'error');
          return of([]); // Return empty array on error to prevent breaking resolvers
        })
      );
    }
    return this.data$.pipe(
      first(), // Ensure the observable completes for resolvers
      map(() => true)
    );
  }

  /**
   * Adds a new item via the API and updates the local data signal.
   * @param item The partial data for the new item.
   * @returns An observable of the newly created item.
   */
  create(item: Partial<T>): Observable<T> {
    // This operation is not supported with static JSON files.
    console.warn(`Create operation on '${this.endpoint}' is not supported with static data.`);
    return throwError(() => new Error('Create operation not supported.'));
    // return this.http.post<T>(`/api/${this.endpoint}`, item).pipe(
    //   tap(newItem => {
    //     this._data.update(currentItems => [newItem, ...currentItems]);
    //   })
    // );
  }

  /**
   * Updates an existing item via the API and updates the local data signal.
   * @param item The partial data for the item to update. It must include the ID.
   * @returns An observable of the updated item.
   */
  update(item: Partial<T>): Observable<T> {
    // This operation is not supported with static JSON files.
    console.warn(`Update operation on '${this.endpoint}' is not supported with static data.`);
    return throwError(() => new Error('Update operation not supported.'));
    // const id = item[this.idKey];
    // if (!id) {
    //   return throwError(() => new Error(`${this.idKey} is required for updates.`));
    // }
    // return this.http.put<T>(`/api/${this.endpoint}/${id}`, item).pipe(
    //   tap(updatedItem => {
    //     this._data.update(currentItems =>
    //       currentItems.map(i => (i[this.idKey] === id ? updatedItem : i))
    //     );
    //   })
    // );
  }

  /**
   * Deletes an item via the API and updates the local data signal.
   * @param id The ID of the item to delete.
   * @returns An observable that completes when the deletion is successful.
   */
  delete(id: string): Observable<void> {
    // This operation is not supported with static JSON files.
    console.warn(`Delete operation on '${this.endpoint}' is not supported with static data.`);
    return throwError(() => new Error('Delete operation not supported.'));
    // return this.http.delete<void>(`/api/${this.endpoint}/${id}`).pipe(
    //   tap(() => {
    //     this._data.update(currentItems =>
    //       currentItems.filter(i => i[this.idKey] !== id)
    //     );
    //   })
    // );
  }

  /**
   * Resets the data by re-fetching from the API.
   */
  public refreshData(): void {
    this.data$ = undefined; // Clear cache
    this.dataLoaded().subscribe();
  }
}
