import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';

// Define types for responsive column counts
export type ItemAmount = 1 | 2 | 3 | 4 | 5 | 6;
export interface ResponsiveItemAmount {
  xs?: ItemAmount;
  sm?: ItemAmount;
  md?: ItemAmount;
  lg?: ItemAmount;
  xl?: ItemAmount;
}

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature.html',
  styleUrl: './feature.css',
  host: {
    '[attr.title]': 'null'
  }
})
export class FeatureComponent {
  title = input<string>();
  // Allow itemPerRow to be a number or a responsive object
  itemPerRow = input.required<ItemAmount | ResponsiveItemAmount>();

  // Computed property to generate responsive grid classes
  readonly featureClasses = computed(() => {
    const config = this.itemPerRow();
    if (typeof config === 'object') {
      let classes = '';
      if (config.xs) classes += ` row-cols-${config.xs}`;
      if (config.sm) classes += ` row-cols-sm-${config.sm}`;
      if (config.md) classes += ` row-cols-md-${config.md}`;
      if (config.lg) classes += ` row-cols-lg-${config.lg}`;
      if (config.xl) classes += ` row-cols-xl-${config.xl}`;
      return classes.trim();
    }
    // Fallback for backward compatibility, providing sensible defaults
    return `row-cols-1 row-cols-sm-2 row-cols-md-${config}`;
  });
}
