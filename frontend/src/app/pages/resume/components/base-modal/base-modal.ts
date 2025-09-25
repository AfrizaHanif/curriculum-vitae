import { Directive, ElementRef, OnDestroy, afterNextRender, inject, input } from '@angular/core';
import * as L from 'leaflet';
import { BaseModalDirective } from '../../../../shared/directives/base-modal';

// This fix is necessary to make Leaflet's default marker icons work correctly with bundlers like Webpack.
// By default, Leaflet tries to autodetect asset paths, which often fails in a bundled environment.
// We are manually setting the paths to the marker images, which should be copied to the `assets` folder.
// See: https://github.com/Leaflet/Leaflet/issues/4968
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = iconDefault;

/**
 * An abstract base class for modal components that display a map.
 * It provides common inputs and logic for initializing a Leaflet map.
 * Using @Directive() allows it to be part of the DI system and use inputs.
 */
@Directive()
export abstract class BaseModalComponent extends BaseModalDirective implements OnDestroy {
  // --- Inputs ---
  latitude = input<string | null>();
  longitude = input<string | null>();

  // --- Abstract Properties ---
  abstract getPopupText(): string;

  // --- Private Properties ---
  protected elementRef = inject(ElementRef);
  private map: L.Map | undefined;
  private observer: MutationObserver | undefined;

  constructor() {
    super();
    // Call setupModalObserver after the view has been rendered
    afterNextRender(() => {
      this.setupModalObserver();
    });
  }

  // Set up a MutationObserver to watch for changes to the modal's visibility
  private setupModalObserver(): void {
    // We need to find the .modal element, which is a child of the host element.
    const modalElement = this.elementRef.nativeElement.querySelector('.modal');
    if (!modalElement) {
      console.error('Modal element not found for map initialization.');
      return;
    }

    // Create a MutationObserver to watch for class changes on the modal element
    this.observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'class') {
          if (modalElement.classList.contains('show')) {
            // The modal is now visible. Initialize the map.
            this.initializeMap();

            // After a short delay to allow the modal transition to complete,
            // invalidate the map's size to ensure it centers correctly.
            setTimeout(() => this.map?.invalidateSize(), 200);
          } else {
            // The modal is now hidden. Reset the map.
            this.resetMap();
          }
        }
      }
    });

    this.observer.observe(modalElement, { attributes: true }); // Watch for attribute changes
  }

  // Initialize the Leaflet map
  private initializeMap(): void {
    // Ensure latitude and longitude are provided
    const lat = this.latitude();
    const lon = this.longitude();

    // Get the map container element within the modal
    const mapContainer = this.elementRef.nativeElement.querySelector('.map-container');

    if (lat && lon && mapContainer && !this.map) {
      // Parse latitude and longitude as floats
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lon);

      // Initialize the map centered at the given coordinates
      this.map = L.map(mapContainer, {
        zoomControl: false,
        minZoom: 13, // Set the minimum zoom level
        maxZoom: 18, // Set the maximum zoom level
      }).setView([latitude, longitude], 15);

      // Add zoom control in a different position
      L.control.zoom({ position: 'topright' }).addTo(this.map);

      // Add a scale control to the map
      L.control.scale().addTo(this.map);

      // Use OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      // Add a marker at the specified coordinates with a popup
      L.marker([latitude, longitude]).addTo(this.map).bindPopup(this.getPopupText()).openPopup();
    }
  }

  // Remove the map and clean up resources
  private resetMap(): void {
    // Remove the map if it exists
    if (this.map) {
      this.map.remove();
      this.map = undefined;
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.map?.remove();
  }
}
