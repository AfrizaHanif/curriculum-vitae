import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactData } from '../../../core/models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private http = inject(HttpClient); // Inject HttpClient
  private apiUrl = `/api/contact`; // API endpoint

  // Method to send contact message
  sendMessage(payload: ContactData): Observable<any> {
    console.log('Sending contact message:', payload);
    return this.http.post(this.apiUrl, payload);
  }
}
