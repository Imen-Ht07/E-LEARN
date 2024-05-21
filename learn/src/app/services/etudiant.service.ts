import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  private baseUrl = 'http://localhost:3000/etudiant'; 

  constructor(private http: HttpClient) { }

  // Inscription d'un nouvel étudiant
  registerEtudiant(etudiantData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/registerEtud`, etudiantData);
  }

  // Obtenir tous les étudiants
  getAllEtudiants(): Observable<any> {
    return this.http.get(`${this.baseUrl}/etudiants`);
  }

  // Mettre à jour un étudiant
  updateEtudiant(id: string, etudiantData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/modifEtud/${id}`, etudiantData);
  }

  // Supprimer un étudiant
  deleteEtudiant(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteEtud/${id}`);
  }

  // Obtenir un étudiant par ID
  getEtudiantById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/EtudByID/${id}`);
  }

  // Obtenir le nombre d'étudiants
  getNombreEtudiants(): Observable<any> {
    return this.http.get(`${this.baseUrl}/count`);
  }

  // Refuser une demande d'inscription d'étudiant
  refuserDemandeInscription(id: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/refuseEtud/${id}`,null);
  }

  // Accepter une demande d'inscription d'étudiant
  accepterDemandeInscription(id: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/acceptEtud/${id}`, null);
  }
}
