import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectToServerComponent } from './connect-to-server.component';

describe('ConnectToServerComponent', () => {
  let component: ConnectToServerComponent;
  let fixture: ComponentFixture<ConnectToServerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectToServerComponent]
    });
    fixture = TestBed.createComponent(ConnectToServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
