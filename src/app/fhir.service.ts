import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from './models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class FhirService {
  private fhirApiUrl = 'http://hapi.fhir.org/baseR4/Patient';

  constructor(private http: HttpClient) {}

  getPatientData(): Observable<Patient> {
    return this.http.get<Patient>(this.fhirApiUrl);
  }
}
