import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusBadgePipe } from '../../../../shared/pipes/status-badge-pipe';
import { ExperienceModalComponent } from "../experience-modal/experience-modal";
import { BaseFeatureComponent } from '../base-feature/base-feature';

@Component({
  selector: 'app-experience-feature',
  imports: [CommonModule, StatusBadgePipe, ExperienceModalComponent],
  templateUrl: './experience-feature.html',
  styleUrl: './experience-feature.css',
  standalone: true,
})
export class ExperienceFeatureComponent extends BaseFeatureComponent {
  // Set Inputs (With Required)
  title = input.required<string>();
  company = input.required<string>();

  // Prefix for experience modals
  override readonly modalIdPrefix = 'exp-modal';
}
