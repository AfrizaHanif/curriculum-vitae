import { Component, inject, signal, computed, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { JumbotronComponent } from '../../shared/components/jumbotron/jumbotron';
import { AccordionComponent } from '../../shared/components/accordion/accordion';
import { ContactFormComponent } from './components/contact-form/contact-form';
import { DescriptionService } from '../../core/services/description';
import { ProfileService } from '../../core/services/profile';
import { SocialService } from '../../core/services/social';
import { ToastService } from '../../core/services/toast';
import { ContactData } from '../../core/models/contact';
import { ConfirmationService } from '../../core/services/confirmation';
import { environment } from '../../../environments/environment';
import { finalize } from 'rxjs';

// A simple delay utility function.
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    JumbotronComponent,
    AccordionComponent,
    ContactFormComponent,
    HttpClientModule, // Add HttpClientModule for making HTTP requests
  ],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
})
export class ContactComponent {
  // Inject Services
  private descriptionService = inject(DescriptionService);
  private profileService = inject(ProfileService);
  private socialService = inject(SocialService);
  private toastService = inject(ToastService);
  private confirmationService = inject(ConfirmationService);
  private http = inject(HttpClient);
  private contactFormComponent = viewChild.required(ContactFormComponent);

  // The Formspree endpoint is now configured in the environment files.
  private formspreeEndpoint = environment.formspreeEndpoint;

  // Get the jumbotron subtitle from the description service
  jumbotronSubtitle = this.descriptionService.contactJumbotronSubtitle;

  isSubmitting = signal(false); // Track form submission state

  // Prepare the contact items for the accordion
  contactItems = computed(() => {
    const profile = this.profileService.profileData();
    const socials = this.socialService.socials();
    return [
      {
        id: 'contactPerson',
        title: 'Contact Person',
        name: profile.fullname_profile,
        phone: profile.phone_profile,
        email: profile.email_profile,
        isOpen: true,
      },
      {
        id: 'socialPerson',
        title: 'Social Media',
        socials: socials,
        isOpen: false,
      },
    ];
  });

  /**
   * Handles the form submission event.
   * @param formData The data from the contact form.
   * @returns A promise that resolves to true on success, and false on failure.
   */
  handleFormSubmit(formData: ContactData): void {
    this.isSubmitting.set(true);

    // To rename the 'recaptcha' field to 'g-recaptcha-response' for Formspree,
    // we use object destructuring. This separates 'recaptcha' from the other
    // form fields and allows us to build a new object with the correct field name.
    const { recaptcha, ...otherFields } = formData;
    const submissionData = {
      ...otherFields,
      'g-recaptcha-response': recaptcha,
    };

    this.http
      .post(this.formspreeEndpoint, submissionData, {
        headers: { Accept: 'application/json' },
      })
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: () => {
          this.toastService.success(
            'Pesan Terkirim! Terima kasih telah menghubungi saya.'
          );
          this.contactFormComponent().resetForm();
        },
        error: (error) => {
          console.error('Formspree submission error:', error);
          // Check for a network error vs. a server error from Formspree
          if (error.status === 0 || error.status === -1) {
            this.toastService.error('Gagal mengirim pesan. Periksa koneksi internet Anda.');
          } else {
            this.toastService.error('Gagal mengirim pesan. Silakan coba lagi nanti.');
          }
        },
      });
  }

  /**
   * Asks for confirmation before leaving the page if the form is dirty.
   * This method is used by the `canDeactivateFormGuard`.
   */
  async canDeactivate(): Promise<boolean> {
    // Although `viewChild.required` is used, it's safer to check for the component's existence
    // before accessing its properties, especially in guards or async operations.
    const formComponent = this.contactFormComponent();

    // If the form is not dirty, allow navigation.
    if (!formComponent?.isDirty()) {
      return true;
    }

    // Show a confirmation dialog if the form is dirty.
    const result = await this.confirmationService.confirm({
      title: 'Batalkan kontak',
      message: 'Anda memiliki form yang masih terisi. Apakah anda ingin keluar dari halaman ini?',
      confirmText: 'Ya',
      cancelText: 'Tidak',
      actionType: 'danger',
      onConfirm: async () => {
        if (!environment.production) {
          console.log('Performing a final action before leaving...');
        }
        await delay(1500); // Simulate async work
        if (!environment.production) {
          console.log('Final action complete.');
        }
        return true; // Returning true allows navigation to proceed.
      },
    });

    // Allow navigation only if the user clicks the 'confirm' button.
    return result === 'confirm';
  }
}
