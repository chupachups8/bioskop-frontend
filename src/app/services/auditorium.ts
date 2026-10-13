import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Auditorium } from '../models/auditorium';

@Injectable({
  providedIn: 'root'
})
export class AuditoriumService {

  private apiUrl = 'http://localhost:8080/auditoriums';

  constructor(private http: HttpClient) {
  }

  getAuditoriums(): Observable<Auditorium[]> {
    return this.http.get<Auditorium[]>(this.apiUrl);
  }
}