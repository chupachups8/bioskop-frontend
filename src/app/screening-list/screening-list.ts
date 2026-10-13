import { Component, OnInit } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

import { Screening } from '../models/screening';
import { ScreeningService } from '../services/screening';

@Component({
  selector: 'app-screening-list',
  imports: [
    AsyncPipe,
    DatePipe
  ],
  templateUrl: './screening-list.html',
  styleUrl: './screening-list.css'
})
export class ScreeningList implements OnInit {

  screenings$!: Observable<Screening[]>;

  constructor(
    private screeningService: ScreeningService
  ) {
  }

  ngOnInit(): void {
    this.screenings$ =
      this.screeningService.getScreenings();
  }
}