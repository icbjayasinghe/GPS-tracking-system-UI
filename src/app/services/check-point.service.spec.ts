import { TestBed } from '@angular/core/testing';

import { CheckPointService } from './check-point.service';

describe('CheckPointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckPointService = TestBed.get(CheckPointService);
    expect(service).toBeTruthy();
  });
});
