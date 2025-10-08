import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiceData } from '../../../../core/models/service';

@Component({
  selector: 'app-service-feature',
  imports: [RouterLink],
  templateUrl: './service-feature.html',
  styleUrl: './service-feature.css'
})
export class ServiceFeature {
  service = input.required<ServiceData>();
}
