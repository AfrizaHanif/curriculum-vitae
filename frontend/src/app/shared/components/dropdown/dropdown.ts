import { Component, input, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from '../../directives/dropdown';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, DropdownDirective],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css'
})
export class DropdownComponent {
  // Get a reference to the DropdownDirective applied to the button in the template.
  private readonly dropdownDirective = viewChild(DropdownDirective);

  // Input properties for the dropdown component
  buttonClass = input<string>('btn-secondary');
  dropdownId = input<string>('dropdownMenu');
  autoClose = input<boolean | 'inside' | 'outside'>(true);
  menuAlign = input<'start' | 'end'>('start');

  /** Programmatically shows the dropdown menu. */
  show(): void {
    this.dropdownDirective()?.show();
  }

  /** Programmatically hides the dropdown menu. */
  hide(): void {
    this.dropdownDirective()?.hide();
  }

  /** Programmatically toggles the dropdown menu. */
  toggle(): void {
    this.dropdownDirective()?.toggle();
  }
}
