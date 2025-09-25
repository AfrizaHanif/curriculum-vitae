import { Component, computed, inject, input, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../../../core/services/portfolio';
import { PortfolioData } from '../../../../core/models/portfolio';

@Component({
  selector: 'app-portfolio-case-study-subheader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio-case-study-subheader.html',
})
export class PortfolioCaseStudySubheaderComponent {}
