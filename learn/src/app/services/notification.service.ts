import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = 'http://localhost:3000/notification'; 

  constructor(private http: HttpClient) { }

  getAllNotifications(): Observable<any> {
    return this.http.get(`${this.apiUrl}/notifications`);
  }
}
