import { TestBed } from '@angular/core/testing';

import { ExcleService } from './excle.service';

describe('ExcleService', () => {
  let service: ExcleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
