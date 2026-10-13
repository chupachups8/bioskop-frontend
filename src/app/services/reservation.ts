import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  Reservation,
  ReservationRequest
} from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'http://localhost:8080/reservations';

  constructor(private http: HttpClient) {
  }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl);
  }

  createReservation(
    reservation: ReservationRequest
  ): Observable<Reservation> {

    return this.http.post<Reservation>(
      this.apiUrl,
      reservation
    );
  }

  getReservedSeats(screeningId: number): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.apiUrl}/screenings/${screeningId}/reserved-seats`
    );
  }
  cancelReservation(id: number): Observable<Reservation> {
    return this.http.put<Reservation>(
      `${this.apiUrl}/${id}/cancel`,
      {}
    );
  }
}