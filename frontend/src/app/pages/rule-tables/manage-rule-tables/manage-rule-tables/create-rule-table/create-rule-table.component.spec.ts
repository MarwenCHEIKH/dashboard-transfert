import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRuleTableComponent } from './create-rule-table.component';

describe('CreateRuleTableComponent', () => {
  let component: CreateRuleTableComponent;
  let fixture: ComponentFixture<CreateRuleTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateRuleTableComponent]
    });
    fixture = TestBed.createComponent(CreateRuleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
