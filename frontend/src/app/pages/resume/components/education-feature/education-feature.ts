import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationModalComponent } from "../education-modal/education-modal";
import { StatusBadgePipe } from '../../../../shared/pipes/status-badge-pipe';
import { BaseFeatureComponent } from '../base-feature/base-feature';

@Component({
  selector: 'app-education-feature',
  imports: [CommonModule, EducationModalComponent, StatusBadgePipe],
  templateUrl: './education-feature.html',
  styleUrl: './education-feature.css',
  standalone: true,
})
export class EducationFeatureComponent extends BaseFeatureComponent {
  // Set Input (With Required)
  school = input.required<string>();
  degree = input.required<string>();
  major = input.required<string>();
  gpa = input<number | null>();

  override readonly modalIdPrefix = 'edu-modal'; // Prefix for education modals
}
