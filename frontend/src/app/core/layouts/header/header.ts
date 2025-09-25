import { Component, inject, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DropdownComponent } from "../../../shared/components/dropdown/dropdown";
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme';
import { Tooltip } from 'bootstrap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, DropdownComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  // Inject services
  protected themeService = inject(ThemeService);
  private elementRef = inject(ElementRef);

  // To hold tooltip instances for proper cleanup
  private tooltipInstances: Tooltip[] = [];

  // Navigation links for the header
  navLinks = [
    { path: '/', icon: 'house-fill', label: 'Home', exact: true },
    { path: '/profile', icon: 'person-vcard', label: 'Profil' },
    { path: '/resume', icon: 'file-earmark-text', label: 'Resume' },
    { path: '/expertise', label: 'Keahlian', icon: 'person-workspace', exact: true },
    { path: '/portfolio', icon: 'briefcase', label: 'Portfolio' },
    { path: '/blog', icon: 'journal-text', label: 'Blog' },
    { path: '/testimonials', icon: 'chat-square-quote', label: 'Testimoni', disabled: true, tooltip: 'Tidak ada testimoni saat ini' },
    { path: '/contact', icon: 'envelope', label: 'Kontak' },
  ];

  ngAfterViewInit(): void {
    // Find all elements with the tooltip toggle and initialize them
    const tooltipTriggerList = [].slice.call(
      this.elementRef.nativeElement.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    this.tooltipInstances = tooltipTriggerList.map(tooltipTriggerEl => {
      return new Tooltip(tooltipTriggerEl);
    });
  }

  ngOnDestroy(): void {
    // Dispose of all tooltips when the component is destroyed
    this.tooltipInstances.forEach(tooltip => tooltip.dispose());
  }

  /**
   * Sets the color theme for the application.
   * @param theme The theme to set ('light', 'dark', or 'auto').
   * @param event The click event to prevent default anchor behavior.
   */
  setTheme(theme: 'light' | 'dark' | 'auto', event: Event): void {
    event.preventDefault();
    this.themeService.setTheme(theme); // No longer needs the second argument
  }
}
