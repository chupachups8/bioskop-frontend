import { Component, OnInit } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

import { Reservation } from '../models/reservation';
import { ReservationService } from '../services/reservation';
import { RouterLink } from '@angular/router';
import { PaymentService } from '../services/payment';
import { Screening } from '../models/screening';
import { ScreeningService } from '../services/screening';
@Component({
  selector: 'app-reservation-list',
  imports: [
    AsyncPipe,
    DatePipe,
    RouterLink
  ],
  templateUrl: './reservation-list.html',
  styleUrl: './reservation-list.css'
})
export class ReservationList implements OnInit {

  reservations$!: Observable<Reservation[]>;
  paymentMessage = '';
  paymentError = '';
  reservationMessage = '';
  reservationError = '';
  screenings: Screening[] = [];

  constructor(
    private reservationService: ReservationService,
    private paymentService: PaymentService,
    private screeningService: ScreeningService
  ) {
  }

  ngOnInit(): void {
    this.reservations$ =
      this.reservationService.getReservations();
    this.screeningService.getScreenings().subscribe({
      next: screenings => {
        this.screenings = screenings;
      },
      error: error => {
        console.error('Greška pri učitavanju projekcija:', error);
      }
    });
  }

  getScreening(screeningId: number): Screening | undefined {
    return this.screenings.find(
      screening => screening.id === screeningId
    );
  }

  payReservation(reservationId: number): void {

    const request = {
      reservationId: reservationId,
      successful: true
    };

    this.paymentService.createPayment(request).subscribe({

          next: () => {
      this.paymentMessage =
        'Plaćanje je uspešno izvršeno.';

      this.paymentError = '';

      this.reservations$ =
        this.reservationService.getReservations();
    },

      error: error => {
        console.error(error);

        this.paymentError = 'Plaćanje nije uspelo.';
        this.paymentMessage = '';
      }

    });
  }
  cancelReservation(reservationId: number): void {

    this.reservationService
      .cancelReservation(reservationId)
      .subscribe({

        next: () => {
          this.reservationMessage =
            'Rezervacija je uspešno otkazana.';

          this.reservationError = '';

          this.reservations$ =
            this.reservationService.getReservations();
        },

        error: error => {
          console.error(error);

          this.reservationError =
            'Rezervacija nije mogla biti otkazana.';

          this.reservationMessage = '';
        }

      });
  }
}