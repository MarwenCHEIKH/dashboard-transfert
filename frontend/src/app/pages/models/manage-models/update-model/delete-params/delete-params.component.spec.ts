import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteParamsComponent } from './delete-params.component';

describe('DeleteParamsComponent', () => {
  let component: DeleteParamsComponent;
  let fixture: ComponentFixture<DeleteParamsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteParamsComponent]
    });
    fixture = TestBed.createComponent(DeleteParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
