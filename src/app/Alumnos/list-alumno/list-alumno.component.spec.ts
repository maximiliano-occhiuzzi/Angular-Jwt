import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAlumnoComponent } from './list-alumno.component';

describe('ListAlumnoComponent', () => {
  let component: ListAlumnoComponent;
  let fixture: ComponentFixture<ListAlumnoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAlumnoComponent]
    });
    fixture = TestBed.createComponent(ListAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
