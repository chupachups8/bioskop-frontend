import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieComponent } from './movie';

describe('MovieComponent', () => {

  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [MovieComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('movie', {
      id: 1,
      title: 'Test film',
      description: 'Test opis',
      duration: 120,
      ageRating: '12',
      active: true
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});