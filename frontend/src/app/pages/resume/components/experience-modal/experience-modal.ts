import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModalComponent } from '../base-modal/base-modal';
import { ModalComponent } from '../../../../shared/components/modal/modal';
import { LeafletMapComponent } from "../../../../shared/components/leaflet-map/leaflet-map";

@Component({
  selector: 'app-experience-modal',
  standalone: true,
  imports: [CommonModule, ModalComponent, LeafletMapComponent],
  templateUrl: './experience-modal.html',
  styleUrl: './experience-modal.css',
})
export class ExperienceModalComponent extends BaseModalComponent {
  // --- Inputs ---
  id = input.required<string>();
  title = input.required<string>();
  company = input.required<string>();
  status = input.required<string>();
  s_period = input.required<string>();
  f_period = input<string | null>();
  description = input<string | null>();

  override getPopupText(): string {
    // Return the company name for the map popup
    return this.company();
  }
}
