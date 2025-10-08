import { Component, inject } from '@angular/core';
import { LoadingService } from '../../../core/services/loading';

@Component({
  selector: 'app-loading-indicator',
  standalone: true,
  imports: [],
  templateUrl: './loading-indicator.html',
  styleUrl: './loading-indicator.css'
})
export class LoadingIndicatorComponent {
  public loadingService = inject(LoadingService);
}
