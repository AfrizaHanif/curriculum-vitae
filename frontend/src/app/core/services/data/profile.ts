import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HobbyData, ProfileData, SkillData } from '../../models/profile';
import { Observable, forkJoin, of, throwError } from 'rxjs';
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
  private _skills = signal<SkillData[]>([]);
  private _hobbies = signal<HobbyData[]>([]);

  // Computed signal that combines profile data with calculated age
  public readonly profileData = computed<ProfileData>(() => ({
    ...this._profile(),
    age: this.getAge(this._profile().birthday_profile),
    hobbies: this._hobbies(),
  }));

  public readonly skills = this._skills.asReadonly();
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

  // Observable stream for skills data
  private skills$: Observable<SkillData[]> = this.http.get<SkillData[]>(`/assets/data/skills.json`).pipe(
    tap(data => {
      console.log('Skills data fetched from API:', data);
      this._skills.set(data ?? []); // Ensure we set an array, even if API returns null
    }),
    shareReplay(1),
    catchError(err => {
      console.error('Failed to load skills data', err);
      return of([]); // On error, return an empty array
    })
  );

  // constructor() {
  //   // Eagerly load profile data. Skills data will be loaded lazily by a resolver.
  //   console.log('ProfileService constructed. Fetching data...');
  //   this.profile$.subscribe();
  // }

  /**
   * Returns an observable that emits when all profile-related data has been loaded.
   * This is the primary method to ensure data is fetched and available.
   * It's ideal for use in a route resolver.
   */
  public dataLoaded(): Observable<boolean> {
    return forkJoin([this.profile$, this.skills$]).pipe(
      // Use first() to ensure the observable completes for the resolver.
      first(),
      map(() => true) // Always return true after both streams have emitted.
    );
  }

  /**
   * Updates the profile data.
   * This now sends an HTTP PUT request to the backend API.
   * @param updatedProfile The profile data to save.
   */
  public updateProfile(updatedProfile: Omit<ProfileData, 'age'>): Observable<ProfileData> {
    // This operation is not supported with static JSON files.
    console.warn('Update profile operation is not supported with static data.');
    return throwError(() => new Error('Update operation not supported.'));
  }

  /**
   * Updates the skills data.
   * @param updatedSkills The skills array to save.
   */
  public updateSkills(updatedSkills: SkillData[]): Observable<SkillData[]> {
    // This operation is not supported with static JSON files.
    console.warn('Update skills operation is not supported with static data.');
    return throwError(() => new Error('Update operation not supported.'));
  }

  /**
   * Creates new skills.
   * @param newSkills The skills array to create.
   */
  public createSkills(newSkills: SkillData[]): Observable<SkillData[]> {
    // This operation is not supported with static JSON files.
    console.warn('Create skills operation is not supported with static data.');
    return throwError(() => new Error('Create operation not supported.'));
  }

  /**
   * Deletes a skill by its ID.
   * @param skillId The ID of the skill to delete.
   */
  public deleteSkill(skillId: string): Observable<void> {
    // This operation is not supported with static JSON files.
    console.warn(`Delete skill operation for ID ${skillId} is not supported with static data.`);
    return throwError(() => new Error('Delete operation not supported.'));
  }
}
