import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCgateGroupsComponent } from './manage-cgate-groups.component';

describe('ManageCgateGroupsComponent', () => {
  let component: ManageCgateGroupsComponent;
  let fixture: ComponentFixture<ManageCgateGroupsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageCgateGroupsComponent]
    });
    fixture = TestBed.createComponent(ManageCgateGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
