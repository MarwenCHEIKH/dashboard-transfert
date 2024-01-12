import { TestBed } from '@angular/core/testing';

import { CgateService } from './cgate.service';

describe('CgateService', () => {
  let service: CgateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CgateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
