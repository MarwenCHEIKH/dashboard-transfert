import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVFDToolbarComponent } from './vfd-toolbar.component';

describe('ManageVFDToolbarComponent', () => {
  let component: ManageVFDToolbarComponent;
  let fixture: ComponentFixture<ManageVFDToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageVFDToolbarComponent],
    });
    fixture = TestBed.createComponent(ManageVFDToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
