import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCgateGroupComponent } from './update-cgate-group.component';

describe('UpdateCgateGroupComponent', () => {
  let component: UpdateCgateGroupComponent;
  let fixture: ComponentFixture<UpdateCgateGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCgateGroupComponent]
    });
    fixture = TestBed.createComponent(UpdateCgateGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
