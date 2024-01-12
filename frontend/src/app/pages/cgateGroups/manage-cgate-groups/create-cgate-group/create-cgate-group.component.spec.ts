import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCgateGroupComponent } from './create-cgate-group.component';

describe('CreateCgateGroupComponent', () => {
  let component: CreateCgateGroupComponent;
  let fixture: ComponentFixture<CreateCgateGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCgateGroupComponent]
    });
    fixture = TestBed.createComponent(CreateCgateGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
