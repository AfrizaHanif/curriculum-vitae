import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModalComponent } from '../base-modal/base-modal';
import { ModalComponent } from '../../../../shared/components/modal/modal';

@Component({
  selector: 'app-education-modal',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './education-modal.html',
  styleUrl: './education-modal.css',
})
export class EducationModalComponent extends BaseModalComponent {
  // --- Inputs ---
  id = input.required<string>();
  school = input.required<string>();
  degree = input.required<string>();
  major = input.required<string>();
  s_period = input.required<string>();
  f_period = input<string | null>();
  gpa = input<number | null>();
  description = input<string | null>();

  override getPopupText(): string {
    // Return the school name for the map popup
    return this.school();
  }
}
