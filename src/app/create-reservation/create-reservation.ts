import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe, NgClass } from '@angular/common';

import { Screening } from '../models/screening';
import { ScreeningService } from '../services/screening';

import { ReservationService } from '../services/reservation';
import { ReservationRequest } from '../models/reservation';

import { Customer } from '../models/customer';
import { CustomerService } from '../services/customer';

@Component({
  selector: 'app-create-reservation',
  imports: [
    ReactiveFormsModule,
    DatePipe,
    NgClass
  ],
  templateUrl: './create-reservation.html',
  styleUrl: './create-reservation.css'
})
export class CreateReservation implements OnInit {

  customers: Customer[] = [];
  screenings: Screening[] = [];

  allSeats: string[] = [];
  reservedSeats: string[] = [];
  selectedSeats: string[] = [];

  seatsPerRow = 10;

  errorMessage = '';

  reservationForm;

  constructor(
    private formBuilder: FormBuilder,
    private screeningService: ScreeningService,
    private customerService: CustomerService,
    private reservationService: ReservationService,
    private router: Router
  ) {
    this.reservationForm = this.formBuilder.group({
      customerId: [
        null as number | null,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      screeningId: [
        null as number | null,
        Validators.required
      ]
    });
  }

  ngOnInit(): void {

    this.customerService.getCustomers().subscribe({
      next: customers => {
        this.customers = customers;
      },

      error: error => {
        console.error(error);
        this.errorMessage = 'Nije moguće učitati kupce.';
      }
    });

    this.screeningService.getScreenings().subscribe({
      next: screenings => {
        this.screenings = screenings;
      },

      error: error => {
        console.error(error);
        this.errorMessage = 'Nije moguće učitati projekcije.';
      }
    });
  }

  onScreeningChange(): void {

    this.allSeats = [];
    this.reservedSeats = [];
    this.selectedSeats = [];
    this.errorMessage = '';

    const screeningId =
      this.reservationForm.controls.screeningId.value;

    if (screeningId === null) {
      return;
    }

    this.loadSeats(Number(screeningId));
  }

  loadSeats(screeningId: number): void {

    const screening = this.screenings.find(
      screening =>
        Number(screening.id) === Number(screeningId)
    );

    if (!screening) {
      this.errorMessage = 'Projekcija nije pronađena.';
      return;
    }

    this.allSeats =
      this.generateSeats(
        screening.auditorium.capacity
      );

    this.reservationService
      .getReservedSeats(screeningId)
      .subscribe({

        next: seats => {
          this.reservedSeats = seats;
        },

        error: error => {
          console.error(error);
          this.errorMessage =
            'Nije moguće učitati zauzeta sedišta.';
        }
      });
  }

  generateSeats(capacity: number): string[] {

    const seats: string[] = [];

    for (let i = 0; i < capacity; i++) {

      const rowIndex =
        Math.floor(i / this.seatsPerRow);

      const rowLetter =
        String.fromCharCode(65 + rowIndex);

      const seatNumber =
        (i % this.seatsPerRow) + 1;

      seats.push(
        `${rowLetter}${seatNumber}`
      );
    }

    return seats;
  }

  isReserved(seat: string): boolean {
    return this.reservedSeats.includes(seat);
  }

  isSelected(seat: string): boolean {
    return this.selectedSeats.includes(seat);
  }

  toggleSeat(seat: string): void {

    if (this.isReserved(seat)) {
      return;
    }

    const index =
      this.selectedSeats.indexOf(seat);

    if (index >= 0) {
      this.selectedSeats.splice(index, 1);
    } else {
      this.selectedSeats.push(seat);
    }

    this.errorMessage = '';
  }

  getSelectedScreening(): Screening | undefined {

    const screeningId =
      this.reservationForm.controls.screeningId.value;

    if (screeningId === null) {
      return undefined;
    }

    return this.screenings.find(
      screening =>
        Number(screening.id) === Number(screeningId)
    );
  }

  getTotalPrice(): number {

    const screening =
      this.getSelectedScreening();

    if (!screening) {
      return 0;
    }

    return Number(screening.ticketPrice)
      * this.selectedSeats.length;
  }

  onSubmit(): void {

    if (this.reservationForm.invalid) {
      this.reservationForm.markAllAsTouched();
      return;
    }

    if (this.selectedSeats.length === 0) {
      this.errorMessage =
        'Izaberite najmanje jedno sedište.';
      return;
    }

    const customerId =
      this.reservationForm.controls.customerId.value;

    const screeningId =
      this.reservationForm.controls.screeningId.value;

    if (
      customerId === null ||
      screeningId === null
    ) {
      return;
    }

    const request: ReservationRequest = {
      customerId: Number(customerId),
      screeningId: Number(screeningId),
      seats: [...this.selectedSeats]
    };

    this.reservationService
      .createReservation(request)
      .subscribe({

        next: () => {
          this.router.navigate(['/reservations']);
        },

        error: error => {
          console.error(error);

          this.errorMessage =
            'Rezervacija nije uspešno kreirana.';
        }
      });
  }
}