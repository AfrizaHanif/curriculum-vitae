import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';

export type CardAmount = 1 | 2 | 3 | 4;

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
  cardPerRow = input.required<CardAmount | number>();

  // Computed property to determine the CSS classes based on cards per row
  readonly cardClasses = computed(() => `row-cols-md-${this.cardPerRow()}`);
}
