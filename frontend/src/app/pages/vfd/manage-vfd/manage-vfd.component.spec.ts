import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVfdComponent } from './manage-vfd.component';

describe('ManageVfdComponent', () => {
  let component: ManageVfdComponent;
  let fixture: ComponentFixture<ManageVfdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageVfdComponent]
    });
    fixture = TestBed.createComponent(ManageVfdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
