import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCgateComponent } from './create-cgate.component';

describe('CreateCgateComponent', () => {
  let component: CreateCgateComponent;
  let fixture: ComponentFixture<CreateCgateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCgateComponent]
    });
    fixture = TestBed.createComponent(CreateCgateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
