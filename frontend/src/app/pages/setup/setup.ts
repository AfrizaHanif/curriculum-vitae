import { Component, computed, inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { JumbotronComponent } from '../../shared/components/jumbotron/jumbotron';
import { DescriptionService } from '../../core/services/description';
import { AccordionComponent } from '../../shared/components/accordion/accordion';
import { AccordionItemData } from '../../core/models/accordion';
import { SetupItem } from '../../core/models/setup';
import { SetupService } from '../../core/services/data/setup';
import { ImageFallbackDirective } from "../../shared/directives/image-fallback";
import { BootstrapDirective } from '../../shared/directives/bootstrap';
import { TooltipDirective } from '../../shared/directives/tooltip';

@Component({
  selector: 'app-uses', // Changed selector to be more semantic
  standalone: true,
  imports: [JumbotronComponent, AccordionComponent, HttpClientModule, ImageFallbackDirective, BootstrapDirective, TooltipDirective],
  templateUrl: './setup.html',
  styleUrl: './setup.css',
})
export class SetupComponent {
  // Renamed to UsesComponent to match routing
  private descriptionService = inject(DescriptionService);
  private setupService = inject(SetupService);
  jumbotronSubtitle = this.descriptionService.setupJumbotronSubtitle;

  // Get setup data from the service
  setupData = this.setupService.setupData;

  // Transform the data for the accordion component
  accordionItems = computed<AccordionItemData[]>(() => {
    return this.setupData().map((category, index) => ({
      id: `setup-item-${index}`, // Add a unique ID for each item
      title: category.name,
      isOpen: index === 0, // Set the first item to be open by default
    }));
  });

  /**
   * Finds and returns the items for a given category name.
   * @param categoryName The name of the category to find.
   * @returns An array of SetupItem, or an empty array if not found.
   */
  getCategoryItems(categoryName: string): SetupItem[] {
    const category = this.setupData().find(c => c.name === categoryName);
    return category ? category.items : [];
  }
}
