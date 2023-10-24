import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCoordComponent } from './header-coord.component';

describe('HeaderCoordComponent', () => {
  let component: HeaderCoordComponent;
  let fixture: ComponentFixture<HeaderCoordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderCoordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderCoordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
