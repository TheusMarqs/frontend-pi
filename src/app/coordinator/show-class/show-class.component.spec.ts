import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowClassComponent } from './show-class.component';

describe('ShowClassComponent', () => {
  let component: ShowClassComponent;
  let fixture: ComponentFixture<ShowClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowClassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
