import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private baseUrl = 'http://localhost:3000/catego';

  constructor(private http: HttpClient) { }

  // Créer une nouvelle catégorie
  createCategory(imageCat:File , categoryData: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('imageCat', imageCat , imageCat.name);
    formData.append('name', categoryData.name);
    return this.http.post<any>(`${this.baseUrl}/categorie`,  formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Obtenir toutes les catégories
  getAllCategories(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/listcategories`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Obtenir une catégorie par son ID
  getCategoryById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/categories/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Mettre à jour une catégorie
  updateCategory(id: string, categoryData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/categories/${id}`, categoryData)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Supprimer une catégorie
  deleteCategory(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/categories/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Gestion des erreurs
  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return throwError(error.message || error);
  }
}
