import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ressources } from 'src/app/models/ressources';
@Injectable({
  providedIn: 'root'
})
export class RessourcesService {
  private baseUrl = 'http://localhost:3000/cours';
  constructor(private http: HttpClient) { }

  createResource(file: File, resourceData: Ressources, categorieID: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('fileURL', file);
    formData.append('title', resourceData.title);
    formData.append('description', resourceData.description);
    formData.append('categorieID', categorieID); 
    return this.http.post<any>(`${this.baseUrl}/${categorieID}/resources`, formData);
  }
  
  getAllResources(categorieID: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getresources/${categorieID}`);
  }  

  getResourceById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/resources/${id}`);
  }

  updateResource(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/resources/${id}`, data);
  }

  deleteResource(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/resources/${id}`);
  }
}