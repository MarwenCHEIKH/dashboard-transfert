import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsToolbarComponent } from './models-toolbar.component';

describe('ModelsToolbarComponent', () => {
  let component: ModelsToolbarComponent;
  let fixture: ComponentFixture<ModelsToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModelsToolbarComponent]
    });
    fixture = TestBed.createComponent(ModelsToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
