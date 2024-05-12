import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = 'http://localhost:3000/user'; 
  isLogin = false;
    
  roleAs!:any;
  constructor(private http: HttpClient, private router : Router) { }


  signin(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signin`, user).pipe(
      map(response => {
        const data = response as any;
        const token = data.token;
        const role = data.role;
        const user = data.user; // Assuming the server returns the user object
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('user', JSON.stringify(user)); // Store the user object as a string
        return response;
      }),
      catchError(error => {
        const errorMessage = error.message || 'Something went wrong. Please try again later.';
        return throwError(errorMessage);
      })
    );
  }

  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    // Include the token in the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/profile`, { headers }).pipe(
      catchError(error => {
        let errorMessage = 'An error occurred. Please try again later.';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        return throwError(errorMessage);
      })
    );
  }
  //logout
  signout(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signout`, {});
  }
  isEns(): boolean {
    const role = localStorage.getItem('role'); // Retrieve the role from localStorage
    return role === 'enseignant'; // Check if the role is 'enseignant'
  }
  isEtudiant(): boolean {
    const role = localStorage.getItem('role'); // Retrieve the role from localStorage
    return role === 'etudiant';
  }
  isAdmin(): boolean {
    const role = localStorage.getItem('role'); // Retrieve the role from localStorage
    return role === 'admin';
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  
  getRole(): string | null {
    return localStorage.getItem('role');
  }
  
}
