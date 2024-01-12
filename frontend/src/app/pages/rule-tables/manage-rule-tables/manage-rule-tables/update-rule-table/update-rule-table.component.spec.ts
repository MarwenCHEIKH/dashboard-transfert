import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRuleTableComponent } from './update-rule-table.component';

describe('UpdateRuleTableComponent', () => {
  let component: UpdateRuleTableComponent;
  let fixture: ComponentFixture<UpdateRuleTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateRuleTableComponent]
    });
    fixture = TestBed.createComponent(UpdateRuleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
