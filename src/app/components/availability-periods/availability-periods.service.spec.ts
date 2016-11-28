/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AvailabilityPeriodsService } from './availability-periods.service';

describe('AvailabilityPeriodsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AvailabilityPeriodsService]
    });
  });

  it('should ...', inject([AvailabilityPeriodsService], (service: AvailabilityPeriodsService) => {
    expect(service).toBeTruthy();
  }));
});
