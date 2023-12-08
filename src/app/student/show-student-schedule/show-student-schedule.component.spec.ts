import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStudentScheduleComponent } from './show-student-schedule.component';

describe('ShowStudentScheduleComponent', () => {
  let component: ShowStudentScheduleComponent;
  let fixture: ComponentFixture<ShowStudentScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowStudentScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowStudentScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
