import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateModelComponent } from './update-model.component';

describe('UpdateModelComponent', () => {
  let component: UpdateModelComponent;
  let fixture: ComponentFixture<UpdateModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateModelComponent]
    });
    fixture = TestBed.createComponent(UpdateModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
