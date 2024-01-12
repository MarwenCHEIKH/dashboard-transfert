import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRemoteSiteComponent } from './update-remote-site.component';

describe('UpdateRemoteSiteComponent', () => {
  let component: UpdateRemoteSiteComponent;
  let fixture: ComponentFixture<UpdateRemoteSiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateRemoteSiteComponent]
    });
    fixture = TestBed.createComponent(UpdateRemoteSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
