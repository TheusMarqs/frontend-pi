import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTimeComponent } from './register-time.component';

describe('RegisterTimeComponent', () => {
  let component: RegisterTimeComponent;
  let fixture: ComponentFixture<RegisterTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
