import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLocalSiteComponent } from './update-local-site.component';

describe('UpdateLocalSiteComponent', () => {
  let component: UpdateLocalSiteComponent;
  let fixture: ComponentFixture<UpdateLocalSiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateLocalSiteComponent]
    });
    fixture = TestBed.createComponent(UpdateLocalSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
