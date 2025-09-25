import {
  Component,
  OnDestroy,
  ElementRef,
  ChangeDetectionStrategy,
  afterNextRender,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resume-subheader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume-subheader.html',
  styleUrl: './resume-subheader.css',
})
export class ResumeSubheaderComponent {}
