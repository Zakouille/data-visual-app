import { TestBed } from '@angular/core/testing';

import { GettingDataService } from './getting-data.service';

describe('GettingDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GettingDataService = TestBed.get(GettingDataService);
    expect(service).toBeTruthy();
  });
});
