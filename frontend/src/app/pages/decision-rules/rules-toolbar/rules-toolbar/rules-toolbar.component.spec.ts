import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesToolbarComponent } from './rules-toolbar.component';

describe('RulesToolbarComponent', () => {
  let component: RulesToolbarComponent;
  let fixture: ComponentFixture<RulesToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RulesToolbarComponent]
    });
    fixture = TestBed.createComponent(RulesToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
