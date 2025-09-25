import { Injectable, computed, inject, signal } from '@angular/core';
import { ProfileService } from './profile';
import { EducationService } from './education';

@Injectable({
  providedIn: 'root'
})
export class DescriptionService {
  // Injecting necessary services
  private profileService = inject(ProfileService);
  private educationService = inject(EducationService);

  /**
   * Computed signal for the home page jumbotron subtitle.
   * Format: Status | Degree | Major
   */
  public homeJumbotronSubtitle = computed(() => {
    const profile = this.profileService.profileData();
    const latestEducation = this.educationService.educationHistory()?.[0];

    const parts = [
      profile.status_profile,
      latestEducation?.degree_education,
      latestEducation?.major_education,
    ];

    return parts.filter(Boolean).join(' | ') || 'Fresh Graduate | Sarjana 1';
  });

  /**
   * Computed signal for the profile page jumbotron subtitle.
   * Format: Degree Major | Status | Tagline
   */
  public profileJumbotronSubtitle = computed(() => {
    const profile = this.profileService.profileData();
    const latestEducation = this.educationService.educationHistory()?.[0];

    const degreeAndMajor = latestEducation ?
      [latestEducation.degree_education, latestEducation.major_education].filter(Boolean).join(' ') :
      'S1 Sistem Informasi'; // Fallback text

    return [degreeAndMajor, profile.status_profile, profile.tagline_profile]
      .filter(Boolean)
      .join(' | ');
  });

  public resumeJumbotronSubtitle = signal('Ringkasan latar belakang profesional saya.');

  /**
   * Signal for the expertise page jumbotron subtitle.
   */
  public expertiseJumbotronSubtitle = signal('Saya mengubah ide kompleks menjadi solusi web yang fungsional, intuitif, dan berbasis data.');

  /**
   * Signal for the portfolio page jumbotron subtitle.
   */
  public portfolioJumbotronSubtitle = signal('Kumpulan proyek yang menampilkan keahlian saya dalam pengembangan web dan desain.');

  /**
   * Signal for the contact page jumbotron subtitle.
   */
  public contactJumbotronSubtitle = signal('Punya pertanyaan atau ingin bekerja sama? Silakan isi form di bawah ini.');

  /**
   * Signal for the testimonials page jumbotron subtitle.
   */
  public testimonialsJumbotronSubtitle = signal('Lihat apa yang dikatakan klien dan kolega tentang saya.');

  /**
   * Signal for the blog page jumbotron subtitle.
   */
  public blogJumbotronSubtitle = signal('Pikiran, tutorial, dan cerita dari perjalanan pengembangan saya.');
}
