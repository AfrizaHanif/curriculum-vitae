import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JumbotronComponent } from '../../shared/components';
import { DescriptionService } from '../../core/services/description';
import { ProjectCard } from "./components/project-card/project-card";
import { ProjectService } from '../../core/services/data/project';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, JumbotronComponent, ProjectCard],
  templateUrl: './project.html',
  styleUrls: ['./project.css']
})
export class ProjectComponent {
  private descriptionService = inject(DescriptionService);
  private projectService = inject(ProjectService);
  public readonly jumbotronSubtitle = this.descriptionService.projectsJumbotronSubtitle;
  public readonly projects = this.projectService.projects;
}
