import { HeaderCoordComponent } from './../../header-coord/header-coord.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterProfessorComponent } from './register-professor.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ProfessorService } from 'src/app/professor.service';
import { Professor } from 'src/app/professors';

describe('RegisterProfessorComponent', () => {

  let component: RegisterProfessorComponent;
  let fixture: ComponentFixture<RegisterProfessorComponent>;
  let formBuilder: FormBuilder;
  let professorService: jasmine.SpyObj<ProfessorService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterProfessorComponent, HeaderCoordComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ProfessorService, useValue: jasmine.createSpyObj('ProfessorService', ['getProfessor', 'update', 'save']) },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: (key: string) => '1' } } } },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }
      ]
    });

    fixture = TestBed.createComponent(RegisterProfessorComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    professorService = TestBed.inject(ProfessorService) as jasmine.SpyObj<ProfessorService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute);

    // Mock the form
    component.formGroupProfessor = formBuilder.group({
      id: [],
      name: ['Test Name', []],
      email: ['test@email.com', []],
      password: ['testPassword', []],
      education: ['PhD', []],
      status: [false]
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize formGroupProfessor', () => {
    expect(component.formGroupProfessor).toBeDefined();
  });

  it('should call getProfessorById on ngOnInit when ID is present', () => {
    spyOn(activatedRoute.snapshot.paramMap, 'get').and.returnValue('1');

    spyOn(component, 'getProfessorById');

    component.ngOnInit();

    expect(component.getProfessorById).toHaveBeenCalledWith(1);
  });

  it('should not call getProfessorById on ngOnInit when ID is not present', () => {
    spyOn(activatedRoute.snapshot.paramMap, 'get').and.returnValue(null);

    spyOn(component, 'getProfessorById');

    component.ngOnInit();

    expect(component.getProfessorById).not.toHaveBeenCalled();
  });

  it('should call save method when isEditing is true', () => {
    component.isEditing = true;
    spyOn(component, 'save');

    component.save();

    expect(component.save).toHaveBeenCalled();
  });

  it('should call save method when isEditing is false', () => {
    component.isEditing = false;
    spyOn(component, 'save');

    component.save();

    expect(component.save).toHaveBeenCalled();
  });

  it('should navigate to correct route on cancel', () => {
    component.cancel();

    expect(router.navigate).toHaveBeenCalledWith(['coordenador/exibir-professor']);
  });

});
