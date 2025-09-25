import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Form } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css'
})
export class FormComponent {
  /**
   * The FormGroup instance to bind to the form.
   */
  formGroup = input.required<FormGroup>();

  /**
   * An output event emitter that fires when the form is submitted.
   * This allows parent components to listen for the form's submit event.
   */
  ngSubmit = output<void>();

  onSubmit(): void {
    this.ngSubmit.emit(); // Emit the submit event when the form is submitted
  }
}
