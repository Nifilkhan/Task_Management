import { TestBed } from '@angular/core/testing';

import { AddtaskServicesTsService } from './addtask.services.ts.service';

describe('AddtaskServicesTsService', () => {
  let service: AddtaskServicesTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddtaskServicesTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
