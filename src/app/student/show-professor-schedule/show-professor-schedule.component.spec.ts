import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProfessorScheduleComponent } from './show-professor-schedule.component';

describe('ShowProfessorScheduleComponent', () => {
  let component: ShowProfessorScheduleComponent;
  let fixture: ComponentFixture<ShowProfessorScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowProfessorScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowProfessorScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
