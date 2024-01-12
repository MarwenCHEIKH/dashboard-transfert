import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeleCommunicationComponent } from './modele-communication.component';

describe('ModeleCommunicationComponent', () => {
  let component: ModeleCommunicationComponent;
  let fixture: ComponentFixture<ModeleCommunicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModeleCommunicationComponent]
    });
    fixture = TestBed.createComponent(ModeleCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
