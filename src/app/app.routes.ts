import { Routes } from '@angular/router';
import { MovieList } from './movie-list/movie-list';
import { ScreeningList } from './screening-list/screening-list';
import { ReservationList } from './reservation-list/reservation-list';
import { Login } from './login/login';
import { authGuard } from './guards/auth-guard';
import { CreateReservation } from './create-reservation/create-reservation';
import { CreateMovie } from './create-movie/create-movie';
import { CreateScreening } from './create-screening/create-screening';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'movies/new',
    component: CreateMovie,
    canActivate: [authGuard, adminGuard]
  },

  {
    path: 'movies',
    component: MovieList,
    canActivate: [authGuard]
  },

  {
    path: 'screenings/new',
    component: CreateScreening,
    canActivate: [authGuard, adminGuard]
  },

  {
    path: 'screenings',
    component: ScreeningList,
    canActivate: [authGuard]
  },

  {
    path: 'reservations',
    component: ReservationList,
    canActivate: [authGuard]
  },

  {
    path: 'reservations/new',
    component: CreateReservation,
    canActivate: [authGuard]
  },

  {
    path: '**',
    redirectTo: 'movies'
  }

];