import { TestBed } from '@angular/core/testing';

import { RuleTableService } from './rule-table.service';

describe('RuleTableService', () => {
  let service: RuleTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuleTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
