import { Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ExpertiseWithProjects } from '../../../../core/models/expertise';
import { ModalComponent } from '../../../../shared/components/modal/modal';

@Component({
  selector: 'app-expertise-modal',
  standalone: true,
  imports: [CommonModule, RouterLink, ModalComponent],
  templateUrl: './expertise-modal.html',
})
export class ExpertiseModalComponent {
  expertise = input.required<ExpertiseWithProjects>(); // Receive expertise data from parent component

  // Modal properties
  readonly id = computed(() => `expertiseModal-${this.expertise().id_expertise}`);
  readonly title = computed(() => this.expertise().title_expertise);
  readonly size = signal('lg');
  readonly centered = signal(true);
  readonly scrollable = signal(true);
}

