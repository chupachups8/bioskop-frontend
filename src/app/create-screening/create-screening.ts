import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Movie } from '../models/movie';
import { Auditorium } from '../models/auditorium';
import { ScreeningRequest } from '../models/screening';

import { MovieService } from '../services/movie';
import { AuditoriumService } from '../services/auditorium';
import { ScreeningService } from '../services/screening';

@Component({
  selector: 'app-create-screening',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-screening.html',
  styleUrl: './create-screening.css'
})
export class CreateScreening implements OnInit {

  movies: Movie[] = [];
  auditoriums: Auditorium[] = [];

  errorMessage = '';

  screeningForm;

  constructor(
    private formBuilder: FormBuilder,
    private movieService: MovieService,
    private auditoriumService: AuditoriumService,
    private screeningService: ScreeningService,
    private router: Router
  ) {

    this.screeningForm = this.formBuilder.group({

      movieId: [
        null as number | null,
        Validators.required
      ],

      auditoriumId: [
        null as number | null,
        Validators.required
      ],

      startTime: [
        '',
        Validators.required
      ],

      ticketPrice: [
        null as number | null,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      active: [
        true
      ]

    });
  }

  ngOnInit(): void {

    this.movieService.getMovies().subscribe({

      next: movies => {
        this.movies = movies;
      },

      error: error => {
        console.error(error);
        this.errorMessage =
          'Nije moguće učitati filmove.';
      }

    });

    this.auditoriumService
      .getAuditoriums()
      .subscribe({

        next: auditoriums => {
          this.auditoriums = auditoriums;
        },

        error: error => {
          console.error(error);
          this.errorMessage =
            'Nije moguće učitati sale.';
        }

      });
  }

  onSubmit(): void {

    if (this.screeningForm.invalid) {
      this.screeningForm.markAllAsTouched();
      return;
    }

    const movieId =
      this.screeningForm.controls.movieId.value;

    const auditoriumId =
      this.screeningForm.controls.auditoriumId.value;

    const startTime =
      this.screeningForm.controls.startTime.value;

    const ticketPrice =
      this.screeningForm.controls.ticketPrice.value;

    if (
      movieId === null ||
      auditoriumId === null ||
      !startTime ||
      ticketPrice === null
    ) {
      return;
    }

    const request: ScreeningRequest = {

      movieId: Number(movieId),

      auditoriumId:
        Number(auditoriumId),

      startTime: startTime,

      ticketPrice:
        Number(ticketPrice),

      active:
        this.screeningForm.controls.active.value ?? true
    };

    this.screeningService
      .createScreening(request)
      .subscribe({

        next: () => {
          this.router.navigate(['/screenings']);
        },

        error: error => {
          console.error(error);

          this.errorMessage =
            'Projekcija nije uspešno dodata.';
        }

      });
  }
}
