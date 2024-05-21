import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LiveCourse } from '../models/live-course';

@Injectable({
  providedIn: 'root'
})
export class LiveCourseService {
  private apiUrl = 'http://localhost:3000/live';

  constructor(private http: HttpClient) { }

  createLiveCourse(liveData: LiveCourse): Observable<LiveCourse> {
    return this.http.post<LiveCourse>(`${this.apiUrl}/createLive`, liveData);
  }

  getAllLiveCourses(): Observable<LiveCourse[]> {
    return this.http.get<LiveCourse[]>(`${this.apiUrl}/liveList`); 
  }

  getLiveCourseById(id: string): Observable<LiveCourse> {
    return this.http.get<LiveCourse>(`${this.apiUrl}/getLiveByid/${id}`); 
  }

  updateLiveCourse(id: string, updates: Partial<LiveCourse>): Observable<LiveCourse> {
    return this.http.put<LiveCourse>(`${this.apiUrl}/updateLive/${id}`, updates); 
  }

  deleteLiveCourse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteLive/${id}`); 
  }
}
