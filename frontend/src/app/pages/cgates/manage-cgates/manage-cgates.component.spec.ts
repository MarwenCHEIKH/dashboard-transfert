import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCgatesComponent } from './manage-cgates.component';

describe('ManageCgatesComponent', () => {
  let component: ManageCgatesComponent;
  let fixture: ComponentFixture<ManageCgatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageCgatesComponent]
    });
    fixture = TestBed.createComponent(ManageCgatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
