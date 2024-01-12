import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLocalSiteComponent } from './create-local-site.component';

describe('CreateLocalSiteComponent', () => {
  let component: CreateLocalSiteComponent;
  let fixture: ComponentFixture<CreateLocalSiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateLocalSiteComponent]
    });
    fixture = TestBed.createComponent(CreateLocalSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
