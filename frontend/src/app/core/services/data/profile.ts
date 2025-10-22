import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HobbyData, ProfileData } from '../../models/profile';
import { Observable, of } from 'rxjs';
import { tap, shareReplay, map, catchError, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  // Inject HttpClient for API calls
  private http = inject(HttpClient);

  // Helper function to calculate age from birthday
  private getAge(birthDateString: string): number {
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    // Adjust age if birthday hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  // Signals to hold profile and skills data
  private _profile = signal<Omit<ProfileData, 'age' | 'hobbies'>>({
    fullname_profile: '',
    photo_profile: '',
    phone_profile: '',
    current_city_profile: '',
    current_prov_profile: '',
    email_profile: '',
    birthday_profile: '',
    tagline_profile: '',
    desc_profile: '',
    status_profile: ''
  });
  private _hobbies = signal<HobbyData[]>([]);

  // Computed signal that combines profile data with calculated age
  public readonly profileData = computed<ProfileData>(() => ({
    ...this._profile(),
    age: this.getAge(this._profile().birthday_profile),
    hobbies: this._hobbies(),
  }));

  public readonly hobbies = this._hobbies.asReadonly();

  // Observable stream for profile data
  private profile$: Observable<ProfileData> = this.http.get<ProfileData>(`/assets/data/profile.json`).pipe(
    tap(data => { // Only update the signal if the API returns valid data
      if (data) {
        const { hobbies, ...profile } = data;
        this._profile.set(profile);
        this._hobbies.set(hobbies ?? []);
      }
    }),
    shareReplay(1),
    catchError(err => {
      console.error('Failed to load profile data', err);
      return of(this.profileData()); // On error, return the current (initial) value from the computed signal
    })
  );

  /**
   * Returns an observable that emits when all profile-related data has been loaded.
   * This is the primary method to ensure data is fetched and available.
   * It's ideal for use in a route resolver.
   */
  public dataLoaded(): Observable<boolean> {
    return this.profile$.pipe(
      // Use first() to ensure the observable completes for the resolver.
      first(),
      map(() => true) // Always return true after both streams have emitted.
    );
  }
}
