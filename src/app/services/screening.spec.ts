import { TestBed } from '@angular/core/testing';

import { Screening } from './screening';

describe('Screening', () => {
  let service: Screening;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Screening);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
