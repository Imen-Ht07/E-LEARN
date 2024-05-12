import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnseignantService {

  private baseUrl = 'http://localhost:3000/enseignant'; // Assurez-vous de mettre le bon port si nécessaire

  constructor(private http: HttpClient) { }

  // Inscription d'un nouvel enseignant
  registerEnseignant(enseignantData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/registerEns`, enseignantData);
  }

  // Obtenir tous les enseignants
  getAllEnseignants(): Observable<any> {
    return this.http.get(`${this.baseUrl}/enseignants`);
  }

  // Mettre à jour un enseignant
  updateEnseignant(id: string, enseignantData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/modifEns/${id}`, enseignantData);
  }

  // Supprimer un enseignant
  deleteEnseignant(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteEns/${id}`);
  }

  // Obtenir un enseignant par ID
  getEnseignantById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/EnsByID/${id}`);
  }

  // Obtenir le nombre d'enseignants
  getNombreEnseignants(): Observable<any> {
    return this.http.get(`${this.baseUrl}/count`);
  }

  // Refuser une demande d'inscription d'enseignant
  refuserDemandeInscription(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/refuseEns/${id}`);
  }

  // Accepter une demande d'inscription d'enseignant
  accepterDemandeInscription(id: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/acceptEns/${id}`, null);
  }
}
