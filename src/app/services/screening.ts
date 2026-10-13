import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Screening, ScreeningRequest } from '../models/screening';


@Injectable({
  providedIn: 'root'
})
export class ScreeningService {

  private apiUrl = 'http://localhost:8080/screenings';

  constructor(private http: HttpClient) {
  }

  getScreenings(): Observable<Screening[]> {
    return this.http.get<Screening[]>(this.apiUrl);
  }

  createScreening(
    screening: ScreeningRequest
  ): Observable<Screening> {
    return this.http.post<Screening>(
      this.apiUrl,
      screening
    );
  }
}
