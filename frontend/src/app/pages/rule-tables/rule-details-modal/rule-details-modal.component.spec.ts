import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleDetailsModalComponent } from './rule-details-modal.component';

describe('RuleDetailsModalComponent', () => {
  let component: RuleDetailsModalComponent;
  let fixture: ComponentFixture<RuleDetailsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RuleDetailsModalComponent]
    });
    fixture = TestBed.createComponent(RuleDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
