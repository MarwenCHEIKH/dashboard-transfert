import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveVfdComponent } from './move-vfd.component';

describe('MoveVfdComponent', () => {
  let component: MoveVfdComponent;
  let fixture: ComponentFixture<MoveVfdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoveVfdComponent]
    });
    fixture = TestBed.createComponent(MoveVfdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
