import { Injectable } from '@angular/core';
import { BaseDataService } from './base-data';
import { ProjectData } from '../../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseDataService<ProjectData> {
  /**
   * Public readonly signal for components to consume project data.
   * This is an alias for the generic `data` signal in the base service.
   */
  public readonly projects = this.data;

  constructor() {
    // The endpoint 'project' and the ID key 'id' are passed to the base service.
    super('project', 'id_project');
  }
}
