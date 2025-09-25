import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpertiseWithProjects } from '../../../../core/models/expertise';
import { ExpertiseModalComponent } from '../expertise-modal/expertise-modal';

@Component({
  selector: 'app-expertise-feature',
  standalone: true,
  imports: [CommonModule, ExpertiseModalComponent],
  templateUrl: './expertise-feature.html',
})
export class ExpertiseFeatureComponent {
  expertise = input.required<ExpertiseWithProjects>(); // Receive expertise data from parent component
}
