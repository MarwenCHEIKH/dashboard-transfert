import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationPartenaireComponent } from './information-partenaire.component';

describe('InformationPartenaireComponent', () => {
  let component: InformationPartenaireComponent;
  let fixture: ComponentFixture<InformationPartenaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformationPartenaireComponent]
    });
    fixture = TestBed.createComponent(InformationPartenaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
