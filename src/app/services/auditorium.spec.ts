import { TestBed } from '@angular/core/testing';

import { Auditorium } from './auditorium';

describe('Auditorium', () => {
  let service: Auditorium;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Auditorium);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
