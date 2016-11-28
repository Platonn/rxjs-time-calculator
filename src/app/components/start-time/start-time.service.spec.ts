/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StartTimeService } from './start-time.service';

describe('StartTimeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StartTimeService]
    });
  });

  it('should ...', inject([StartTimeService], (service: StartTimeService) => {
    expect(service).toBeTruthy();
  }));
});
