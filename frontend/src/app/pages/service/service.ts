import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JumbotronComponent } from '../../shared/components/jumbotron/jumbotron';
import { FeatureComponent } from '../../shared/components/feature/feature';
import { DescriptionService } from '../../core/services/description';
import { ServiceFeature } from "./components/service-feature/service-feature";
import { ServiceDataService } from '../../core/services/data/service';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule, JumbotronComponent, FeatureComponent, ServiceFeature],
  templateUrl: './service.html',
  styleUrl: './service.css'
})
export class ServiceComponent implements OnInit {
  private descriptionService = inject(DescriptionService);
  private serviceDataService = inject(ServiceDataService);

  jumbotronSubtitle = this.descriptionService.servicesJumbotronSubtitle;
  services = this.serviceDataService.services;

  ngOnInit(): void {
    // Ensure data is loaded when the component initializes
    this.serviceDataService.dataLoaded().subscribe();
  }
}
