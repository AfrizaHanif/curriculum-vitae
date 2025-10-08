import { Pipe, PipeTransform } from '@angular/core';

/**
 * A pipe to transform a status string into a corresponding Bootstrap badge class.
 */
@Pipe({
  name: 'statusBadge',
  standalone: true,
})
export class StatusBadgePipe implements PipeTransform {
  transform(status: string | null | undefined): string {
    switch (status) {
      case 'Finished':
        return 'text-bg-success';
      case 'Ongoing':
        return 'text-bg-primary';
      case 'Planning':
        return 'text-bg-warning';
      case 'Stopped':
        return 'text-bg-danger';
      default:
        return 'text-bg-secondary';
    }
  }
}
