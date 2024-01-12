import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgateToolbarComponent } from './cgateGroup-toolbar.component';

describe('CgateToolbarComponent', () => {
  let component: CgateToolbarComponent;
  let fixture: ComponentFixture<CgateToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CgateToolbarComponent],
    });
    fixture = TestBed.createComponent(CgateToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
