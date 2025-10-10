import { AfterViewInit, Component, ElementRef, inject, input, OnDestroy, signal } from '@angular/core';
import * as L from 'leaflet';

export interface LeafletMarker {
  lat: number;
  lng: number;
  name: string;
  popupContent?: string; // Added to support custom popup content
  slug?: string; // Optional slug for navigation
}

@Component({
  selector: 'app-leaflet-map',
  standalone: true,
  templateUrl: './leaflet-map.html',
  styleUrl: './leaflet-map.css'
})
export class LeafletMapComponent implements AfterViewInit, OnDestroy {
  // --- Inputs ---
  // latitude = input.required<string | null>();
  // longitude = input.required<string | null>();
  latitude = input<number>(-7.336);
  longitude = input<number>(112.72);
  markers = input<LeafletMarker[]>([]);
  popupText = input<string>('');
  zoom = input<number>(13);
  iconImage = input<string>('assets/images/leaflet/marker-icon.png');
  iconImageRetina = input<string>('assets/images/leaflet/marker-icon-2x.png');

  // --- Private Properties ---
  private elementRef = inject(ElementRef);
  private map: L.Map | undefined;
  private observer: IntersectionObserver | undefined;
  protected isMapVisible = signal(false);

  constructor() {
    // This fix is necessary to make Leaflet's default marker icons work correctly with bundlers like Webpack.
    // By default, Leaflet tries to autodetect asset paths, which often fails in a bundled environment.
    // We are manually setting the paths to the marker images, which should be copied to the `assets` folder.
    // See: https://github.com/Leaflet/Leaflet/issues/4968
    const iconRetinaUrl = this.iconImageRetina();
    const iconUrl = this.iconImage();
    const shadowUrl = 'assets/images/leaflet/marker-shadow.png';
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
  }

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver(): void {
    const options = {
      root: null, // relative to the viewport
      threshold: 0.1 // trigger when 10% of the element is visible
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // When the map container is intersecting with the viewport, initialize it.
        this.handleVisibilityChange(entry.isIntersecting);
      });
    }, options);

    this.observer.observe(this.elementRef.nativeElement.querySelector('.map-container'));
  }

  private initializeMap(): void {
    const lat = this.latitude();
    const lon = this.longitude();
    const mapContainer = this.elementRef.nativeElement.querySelector('.map-container');
    const markers = this.markers();

    if (lat && lon && mapContainer && !this.map) {
      // const latitude = parseFloat(lat);
      // const longitude = parseFloat(lon);

      this.map = L.map(mapContainer, {
        zoomControl: false,
        zoom: this.zoom(),
        minZoom: 13,
        maxZoom: 18,
      }).setView([this.latitude(), this.longitude()], 15);

      L.control.zoom({ position: 'topright' }).addTo(this.map);
      L.control.scale().addTo(this.map);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      // L.marker([this.latitude(), this.longitude()]).addTo(this.map).bindPopup(this.popupText()).openPopup();

      if (markers.length > 0) {
        const markerGroup = L.featureGroup().addTo(this.map);
        markers.forEach(markerInfo => {
          if (markerInfo.lat && markerInfo.lng) {
            // Use custom popupContent if provided, otherwise default to name
            const popupHtml = markerInfo.popupContent || `<b>${markerInfo.name}</b>`;
            L.marker([markerInfo.lat, markerInfo.lng]).bindPopup(popupHtml).addTo(markerGroup);
          }
        });
        this.map.fitBounds(markerGroup.getBounds().pad(0.1));
      } else {
        // Fallback to single marker if no markers are provided
        L.marker([this.latitude(), this.longitude()]).addTo(this.map).bindPopup(this.popupText()).openPopup();
      }

      // Show the map only after it's fully initialized
      this.isMapVisible.set(true);
    }
  }

  private handleVisibilityChange(isVisible: boolean): void {
    if (isVisible) {
      // A short delay ensures the container has its final dimensions before the map is initialized or resized.
      setTimeout(() => {
        if (!this.map) {
          this.initializeMap();
        } else {
          this.map.invalidateSize();
        }
      }, 200);
    } else {
      this.resetMap();
    }
  }

  public resetMap(): void {
    // Hide the map to show the placeholder
    this.isMapVisible.set(false);
    // Destroy the map instance
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
