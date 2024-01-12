import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleTableToolbarComponent } from './rule-table-toolbar.component';

describe('RuleTableToolbarComponent', () => {
  let component: RuleTableToolbarComponent;
  let fixture: ComponentFixture<RuleTableToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RuleTableToolbarComponent]
    });
    fixture = TestBed.createComponent(RuleTableToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
