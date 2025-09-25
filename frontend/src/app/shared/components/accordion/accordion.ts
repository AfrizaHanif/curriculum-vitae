import { Component, ContentChild, input, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AccordionItemData } from '../../../core/models/accordion';

@Component({
  selector: 'app-accordion',
  imports: [NgTemplateOutlet],
  templateUrl: './accordion.html',
  styleUrl: './accordion.css'
})
export class AccordionComponent {
  id_parent = input.required<string>(); // Unique identifier for the accordion instance
  items = input<AccordionItemData[]>([]); // Array of accordion items

  // Template reference for the body of each accordion item
  @ContentChild('itemBody') itemBodyTemplate: TemplateRef<any> | undefined;
}
