import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVfdComponent } from './create-vfd.component';

describe('CreateVfdComponent', () => {
  let component: CreateVfdComponent;
  let fixture: ComponentFixture<CreateVfdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateVfdComponent]
    });
    fixture = TestBed.createComponent(CreateVfdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
