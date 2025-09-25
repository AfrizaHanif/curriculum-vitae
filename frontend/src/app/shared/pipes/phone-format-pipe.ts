import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
  standalone: true,
})
export class PhoneFormat implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) {
      return '';
    }

    // Remove all non-digit characters except for the leading '+'
    const cleaned = ('' + value).replace(/[^\d+]/g, '');

    // Example formatting for an Indonesian phone number (+62)
    if (cleaned.startsWith('+62') && cleaned.length > 3) {
      const countryCode = cleaned.substring(0, 3); // +62
      const restOfNumber = cleaned.substring(3);

      if (restOfNumber.length <= 3) {
        return `${countryCode} ${restOfNumber}`;
      } else if (restOfNumber.length <= 7) {
        return `${countryCode} ${restOfNumber.substring(0, 3)}-${restOfNumber.substring(3)}`;
      }
      return `${countryCode} ${restOfNumber.substring(0, 3)}-${restOfNumber.substring(3, 7)}-${restOfNumber.substring(7)}`;
    }

    // You can add more formatting rules for other countries here.
    return value; // Return original value if no specific format matches.
  }
}
