import { Component, input } from '@angular/core';

@Component({
  selector: 'app-skill-card',
  standalone: true,
  templateUrl: './skill-card.html',
  styleUrl: './skill-card.css'
})
export class SkillCardComponent {
  // Set Input (With Required)
  skillName = input.required<string>();
  skillPercentage = input.required<number>();
}
