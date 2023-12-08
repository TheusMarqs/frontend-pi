import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseProfessorComponent } from './choose-professor.component';

describe('ChooseProfessorComponent', () => {
  let component: ChooseProfessorComponent;
  let fixture: ComponentFixture<ChooseProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseProfessorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
