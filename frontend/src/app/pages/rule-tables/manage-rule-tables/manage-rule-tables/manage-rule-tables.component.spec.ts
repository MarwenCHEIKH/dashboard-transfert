import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRuleTablesComponent } from './manage-rule-tables.component';

describe('ManageRuleTablesComponent', () => {
  let component: ManageRuleTablesComponent;
  let fixture: ComponentFixture<ManageRuleTablesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageRuleTablesComponent]
    });
    fixture = TestBed.createComponent(ManageRuleTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
