import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MovieService } from '../services/movie';

@Component({
  selector: 'app-create-movie',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-movie.html',
  styleUrl: './create-movie.css'
})
export class CreateMovie {

  errorMessage = '';

  movieForm;

  constructor(
    private formBuilder: FormBuilder,
    private movieService: MovieService,
    private router: Router
  ) {

    this.movieForm = this.formBuilder.group({

      title: [
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],

      description: [
        '',
        Validators.required
      ],

      duration: [
        null as number | null,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      ageRating: [
        '',
        Validators.required
      ],

      active: [
        true
      ]

    });
  }

  onSubmit(): void {

    if (this.movieForm.invalid) {
      this.movieForm.markAllAsTouched();
      return;
    }

    const movie = {

      title:
        this.movieForm.controls.title.value!,

      description:
        this.movieForm.controls.description.value!,

      duration:
        Number(
          this.movieForm.controls.duration.value
        ),

      ageRating:
        this.movieForm.controls.ageRating.value!,

      active:
        this.movieForm.controls.active.value ?? true
    };

    this.movieService
      .createMovie(movie)
      .subscribe({

        next: () => {
          this.router.navigate(['/movies']);
        },

        error: error => {
          console.error(error);

          this.errorMessage =
            'Film nije uspešno dodat.';
        }

      });
  }
}
