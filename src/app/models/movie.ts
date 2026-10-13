export class Movie {
  id: number;
  title: string;
  description: string;
  duration: number;
  ageRating: string;
  active: boolean;

  constructor(
    id: number,
    title: string,
    description: string,
    duration: number,
    ageRating: string,
    active: boolean
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.duration = duration;
    this.ageRating = ageRating;
    this.active = active;
  }
}