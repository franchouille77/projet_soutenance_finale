import { TestBed } from '@angular/core/testing';

import { ApiBddService } from './api-bdd.service';

describe('ApiBddService', () => {
  let service: ApiBddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiBddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
