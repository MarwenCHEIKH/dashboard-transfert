import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCgateComponent } from './update-cgate.component';

describe('UpdateCgateComponent', () => {
  let component: UpdateCgateComponent;
  let fixture: ComponentFixture<UpdateCgateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCgateComponent]
    });
    fixture = TestBed.createComponent(UpdateCgateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
