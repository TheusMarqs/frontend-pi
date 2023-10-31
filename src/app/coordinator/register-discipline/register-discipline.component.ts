import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/course.service';
import { Course } from 'src/app/courses';
import { DisciplineService } from 'src/app/discipline.service';

@Component({
  selector: 'app-register-discipline',
  templateUrl: './register-discipline.component.html',
  styleUrls: ['./register-discipline.component.css']
})
export class RegisterDisciplineComponent {
  formGroupDiscipline: FormGroup;
  submitted: boolean = false;
  isEditing: boolean = false;
  courses: Course[] = [];

  constructor(private formBuilder: FormBuilder, private disciplineService: DisciplineService,
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService) {

    this.formGroupDiscipline = formBuilder.group({
      id: [],
      course: [, [Validators.required]],
      name: [, [Validators.required, Validators.pattern(/\S/)]],
      workload: [, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((courses) => {
      this.courses = courses;
    });
    const id = Number(this.route.snapshot.paramMap.get("id"));
    if (id) {
      this.getDisciplineById(id);
    }
  }

  getDisciplineById(id: number) {
    this.disciplineService.getDiscipline(id).subscribe({
      next: data => {
        this.formGroupDiscipline.setValue(data);
        this.isEditing = true;
      }
    })
  }


  save() {
    this.submitted = true;
    if (this.isEditing) {
      if (this.formGroupDiscipline.valid) {
        this.disciplineService.update(this.formGroupDiscipline.value).subscribe({
          next: () => {
            this.router.navigate(['coordenador/exibir-disciplina']);
          }
        })
      }
    }

    else {
      this.disciplineService.save(this.formGroupDiscipline.value).subscribe({
        next: () => {
          this.router.navigate(['coordenador/exibir-disciplina']);
        }
      })
    }

  }

  cancel() {
    this.router.navigate(['coordenador/exibir-disciplina']);
  }

  get course(): any {
    return this.formGroupDiscipline.get("course");
  }

  get name(): any {
    return this.formGroupDiscipline.get("name");
  }
  get workload(): any {
    return this.formGroupDiscipline.get("workload");
  }
}
