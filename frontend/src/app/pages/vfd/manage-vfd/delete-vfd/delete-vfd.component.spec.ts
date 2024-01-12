import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteVfdComponent } from './delete-vfd.component';

describe('DeleteVfdComponent', () => {
  let component: DeleteVfdComponent;
  let fixture: ComponentFixture<DeleteVfdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteVfdComponent]
    });
    fixture = TestBed.createComponent(DeleteVfdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
