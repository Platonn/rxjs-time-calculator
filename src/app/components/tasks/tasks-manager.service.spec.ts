/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TasksManagerService } from './tasks-manager.service';

describe('TasksManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TasksManagerService]
    });
  });

  it('should ...', inject([TasksManagerService], (service: TasksManagerService) => {
    expect(service).toBeTruthy();
  }));
});
