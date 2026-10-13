import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateScreening } from './create-screening';

describe('CreateScreening', () => {
  let component: CreateScreening;
  let fixture: ComponentFixture<CreateScreening>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateScreening]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateScreening);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
