import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { Movie } from '../models/movie';
import { MovieComponent } from '../movie/movie';
import { MovieService } from '../services/movie';

@Component({
  selector: 'app-movie-list',
  imports: [
    MovieComponent,
    AsyncPipe
  ],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css'
})
export class MovieList implements OnInit {

  title = 'Filmovi u bioskopu';

  movies$!: Observable<Movie[]>;

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.movies$ = this.movieService.getMovies();
  }
}


