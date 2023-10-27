import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowClassroomComponent } from './show-classroom.component';

describe('ShowClassroomComponent', () => {
  let component: ShowClassroomComponent;
  let fixture: ComponentFixture<ShowClassroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowClassroomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
