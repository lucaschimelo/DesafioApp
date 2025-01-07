import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivroAddEditComponent } from './livro-add-edit.component';

describe('LivroAddEditComponent', () => {
  let component: LivroAddEditComponent;
  let fixture: ComponentFixture<LivroAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivroAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivroAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
