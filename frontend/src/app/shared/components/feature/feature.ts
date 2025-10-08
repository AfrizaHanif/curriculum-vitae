import { NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';

export type FeatureAmount = 1 | 2 | 3 | 4;

@Component({
  selector: 'app-feature',
  imports: [NgClass],
  templateUrl: './feature.html',
  styleUrl: './feature.css',
  host: {
    '[attr.title]': 'null'
  }
})
export class FeatureComponent {
  // Input property for the feature component
  title = input<string>();
  itemPerRow = input.required<FeatureAmount | number>();

  // Computed property to determine the CSS classes based on cards per row
  readonly featureClasses = computed(() => `row-cols-md-${this.itemPerRow()}`);
}
