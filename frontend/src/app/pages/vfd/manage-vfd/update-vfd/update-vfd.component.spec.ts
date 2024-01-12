import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVfdComponent } from './update-vfd.component';

describe('UpdateVfdComponent', () => {
  let component: UpdateVfdComponent;
  let fixture: ComponentFixture<UpdateVfdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateVfdComponent]
    });
    fixture = TestBed.createComponent(UpdateVfdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
