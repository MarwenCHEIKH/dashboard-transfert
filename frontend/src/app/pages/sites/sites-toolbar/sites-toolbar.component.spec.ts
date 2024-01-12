import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitesToolbarComponent } from './sites-toolbar.component';

describe('SitesToolbarComponent', () => {
  let component: SitesToolbarComponent;
  let fixture: ComponentFixture<SitesToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SitesToolbarComponent]
    });
    fixture = TestBed.createComponent(SitesToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
