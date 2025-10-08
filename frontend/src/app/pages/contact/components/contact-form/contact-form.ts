import { Component, computed, inject, input, output, viewChild, PLATFORM_ID, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ContactData } from '../../../../core/models/contact';
import { ValidationComponent } from '../../../../shared/components/validation/validation';
import { NgxCaptchaModule, ReCaptcha2Component } from 'ngx-captcha';
import { environment } from '../../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from '../../../../core/services/theme';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ValidationComponent, NgxCaptchaModule], // Add NgxCaptchaModule
  templateUrl: './contact-form.html',
})
export class ContactFormComponent implements OnInit {
  // Inject Angular's Class
  private fb = inject(FormBuilder);
  private themeService = inject(ThemeService);
  private platformId = inject(PLATFORM_ID);
  private route = inject(ActivatedRoute);

  // Emit the form's value when it is submitted.
  formSubmit = output<ContactData>();

  // Get a reference to the ngx-captcha component instance.
  private captchaComponent = viewChild.required<ReCaptcha2Component>('captchaElem');

  // Receive state from the parent component.
  isSubmitting = input(false);

  // The site key is now configured in the environment files (e.g., src/environments/environment.ts)
  protected siteKey = environment.recaptcha.siteKey;

  private isBrowser = isPlatformBrowser(this.platformId);

  /**
   * A computed signal that determines the reCAPTCHA theme based on the global ThemeService.
   * It resolves the 'auto' theme to 'light' or 'dark' based on the user's OS preference.
   */
  protected captchaTheme = computed<'light' | 'dark'>(() => {
    const theme = this.themeService.currentTheme();
    if (theme === 'auto') {
      if (this.isBrowser) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return 'light'; // Default for server-side rendering
    }
    return theme as 'light' | 'dark';
  });
  protected captchaSize: 'compact' | 'normal' = 'normal';
  protected captchaLang = 'id'; // Use 'en' for English, 'id' for Indonesian, etc.

  // Validate Input
  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    content: ['', Validators.required],
    recaptcha: ['', Validators.required], // Add reCAPTCHA form control
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const subject = params['subject'];

      // If a subject is passed via query params, patch the value and disable the field.
      if (subject) {
        this.contactForm.patchValue({
          subject: subject
        });
        this.contactForm.controls.subject.disable();
      } else {
        // If no subject is in the params, ensure the field is enabled.
        this.contactForm.controls.subject.enable();
      }

      // You can still pre-fill other fields like 'content' if they exist.
      if (params['content']) {
        this.contactForm.patchValue({ content: params['content'] });
      }
    });
  }

  /**
   * A computed signal that reactively tracks the form's dirty state.
   */
  isDirty = computed(() => this.contactForm.dirty);

  // Handle the form submission locally.
  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    // Emit the raw form value to the parent.
    this.formSubmit.emit(this.contactForm.getRawValue() as ContactData);
  }

  /**
   * Resets the form to its initial state and emits that it is no longer dirty.
   * This method can be called by a parent component.
   */
  public resetForm(): void {
    this.contactForm.reset();
    // Re-enable the subject control in case it was disabled.
    // The queryParams subscription in ngOnInit will handle re-disabling it if needed on re-initialization.
    this.contactForm.controls.subject.enable();

    // The `ngx-captcha` component has a name collision on its `reset` property and method.
    // To avoid the resulting TypeScript error, we can use the `reloadCaptcha()` method instead,
    // which achieves the same goal of resetting the widget.
    this.captchaComponent().reloadCaptcha();
  }

  /**
   * Checks if a form control is invalid and has been touched or is dirty.
   * @param controlName The name of the form control.
   */
  isInvalid(controlName: string): boolean {
    const control = this.contactForm.get(controlName); // e.g., 'name', 'email'
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }
}
