import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterClassroomComponent } from './register-classroom.component';

describe('RegisterClassroomComponent', () => {
  let component: RegisterClassroomComponent;
  let fixture: ComponentFixture<RegisterClassroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterClassroomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
