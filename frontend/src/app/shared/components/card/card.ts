import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';

export type CardAmount = 1 | 2 | 3 | 4 | 5 | 6;
export interface ResponsiveCardAmount {
  xs?: CardAmount;
  sm?: CardAmount;
  md?: CardAmount;
  lg?: CardAmount;
  xl?: CardAmount;
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.css',
  host: {
    '[attr.title]': 'null'
  }
})
export class CardComponent {
  // Input properties for the card component
  title = input<string>();
  cardPerRow = input.required<CardAmount | ResponsiveCardAmount>();

  // Computed property to determine the CSS classes based on cards per row
  readonly cardClasses = computed(() => {
    const config = this.cardPerRow();
    if (typeof config === 'object') {
      let classes = '';
      if (config.xs) classes += ` row-cols-${config.xs}`;
      if (config.sm) classes += ` row-cols-sm-${config.sm}`;
      if (config.md) classes += ` row-cols-md-${config.md}`;
      if (config.lg) classes += ` row-cols-lg-${config.lg}`;
      if (config.xl) classes += ` row-cols-xl-${config.xl}`;
      return classes.trim();
    }
    // Fallback for original number input
    return `row-cols-1 row-cols-sm-2 row-cols-md-${config}`;
  });
}
