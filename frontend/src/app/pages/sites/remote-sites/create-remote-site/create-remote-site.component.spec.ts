import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRemoteSiteComponent } from './create-remote-site.component';

describe('CreateRemoteSiteComponent', () => {
  let component: CreateRemoteSiteComponent;
  let fixture: ComponentFixture<CreateRemoteSiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateRemoteSiteComponent]
    });
    fixture = TestBed.createComponent(CreateRemoteSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
