import { TestBed } from '@angular/core/testing';

import { TemperatureDataService } from './temperature-data.service';

describe('TemperatureDataService', () => {
  let service: TemperatureDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemperatureDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
