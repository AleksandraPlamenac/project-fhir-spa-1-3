import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Patient } from './models/patient.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private patients: Patient[] = [];
  private currentPatientSubject = new BehaviorSubject<Patient | null>(null);

  constructor(private http: HttpClient) {}

  loadPatients() {
    const baseUrl = window.location.hostname.includes('github.io') ? '/project-fhir-spa-1-2/' : '/';
    this.http.get<{ patients: Patient[] }>(baseUrl + 'assets/patients_data.json').subscribe({
      next: (data) => this.patients = data.patients,
      error: (err) => console.error('Failed to load patient data:', err)
    });
  }

  validateLogin(username: string, password: string): Observable<boolean> {
    if (password !== 'patient') return of(false);
    const foundPatient = this.patients.find(p => p.login.toLowerCase() === username.toLowerCase());
    if (foundPatient) {
      this.currentPatientSubject.next(foundPatient);
      return of(true);
    }
    return of(false);
  }

  getCurrentPatient(): Patient | null {
    return this.currentPatientSubject.value;
  }
}
