import { Component, input } from '@angular/core';

@Component({
  selector: 'app-hobbies-feature',
  imports: [],
  templateUrl: './hobbies-feature.html',
  styleUrl: './hobbies-feature.css'
})
export class HobbiesFeature {
  // Set Input (With Required)
  name = input.required<string>();
  icon = input.required<string>();
}
