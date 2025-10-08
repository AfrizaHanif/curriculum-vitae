import { Component, input } from '@angular/core';
import { ProjectData } from '../../../../core/models/project';

@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css'
})
export class ProjectCard {
  item = input.required<ProjectData>();
}
