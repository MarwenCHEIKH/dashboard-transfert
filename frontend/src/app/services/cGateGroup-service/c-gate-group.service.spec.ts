import { TestBed } from '@angular/core/testing';

import { CGateGroupService } from './c-gate-group.service';

describe('CGateGroupService', () => {
  let service: CGateGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CGateGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
