
import { Component, Input } from '@angular/core';
import { Movie } from '../models/movie';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-movie',
  imports: [NgClass],
  templateUrl: './movie.html',
  styleUrl: './movie.css',
})
export class MovieComponent {
  @Input() movie!: Movie;
}
