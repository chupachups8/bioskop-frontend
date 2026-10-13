export interface ScreeningMovie {
  id: number;
  title: string;
  description: string;
  duration: number;
  ageRating: string;
  active: boolean;
}

export interface ScreeningAuditorium {
  id: number;
  name: string;
  capacity: number;
}

export interface Screening {
  id: number;
  movie: ScreeningMovie;
  auditorium: ScreeningAuditorium;
  startTime: string;
  ticketPrice: number;
  active: boolean;
}
export interface ScreeningRequest {
  movieId: number;
  auditoriumId: number;
  startTime: string;
  ticketPrice: number;
  active: boolean;
}