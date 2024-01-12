import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateModelComponent } from './create-model.component';

describe('CreateModelComponent', () => {
  let component: CreateModelComponent;
  let fixture: ComponentFixture<CreateModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateModelComponent]
    });
    fixture = TestBed.createComponent(CreateModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
