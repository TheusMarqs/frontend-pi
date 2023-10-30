import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDisciplineComponent } from './register-discipline.component';

describe('RegisterDisciplineComponent', () => {
  let component: RegisterDisciplineComponent;
  let fixture: ComponentFixture<RegisterDisciplineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterDisciplineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterDisciplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
