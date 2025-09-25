import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxCaptchaModule } from 'ngx-captcha';

import { ContactFormComponent } from './contact-form';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Import the component itself and any modules it depends on for testing.
      // NoopAnimationsModule is useful to prevent animation-related issues in tests.
      imports: [
        ContactFormComponent,
        NoopAnimationsModule,
        NgxCaptchaModule // NgxCaptchaModule is needed because the template uses ngx-recaptcha2
      ],
      // If the component had service dependencies, you would provide test doubles here.
      // providers: [ { provide: ThemeService, useValue: mockThemeService } ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the contact form with 5 controls', () => {
    expect(component.contactForm).toBeDefined();
    expect(Object.keys(component.contactForm.controls).length).toBe(5);
    expect(component.contactForm.contains('name')).toBe(true);
    expect(component.contactForm.contains('recaptcha')).toBe(true);
  });

  it('should not emit formSubmit event if form is invalid', () => {
    spyOn(component.formSubmit, 'emit');

    // Form is invalid by default, so just call onSubmit
    component.onSubmit();

    expect(component.formSubmit.emit).not.toHaveBeenCalled();
  });

  it('should emit formSubmit event with form data when form is valid', () => {
    spyOn(component.formSubmit, 'emit');

    // Fill out the form to make it valid
    const testData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      subject: 'Test Subject',
      content: 'Test message content.',
      recaptcha: 'test-recaptcha-token',
    };
    component.contactForm.setValue(testData);
    component.onSubmit();

    expect(component.formSubmit.emit).toHaveBeenCalledWith(testData);
  });
});
