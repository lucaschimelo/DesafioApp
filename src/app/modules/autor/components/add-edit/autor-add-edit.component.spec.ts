import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorAddEditComponent } from './autor-add-edit.component';

describe('AutorAddEditComponent', () => {
  let component: AutorAddEditComponent;
  let fixture: ComponentFixture<AutorAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutorAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
