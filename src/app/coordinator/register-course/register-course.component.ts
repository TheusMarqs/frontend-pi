import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './register-course.component.html',
  styleUrls: ['./register-course.component.css', '../../app.component.css']
})
export class RegisterCourseComponent implements OnInit {
  formGroupCourse: FormGroup;
  submitted: boolean = false;
  isEditing: boolean = false;

  constructor(private formBuilder: FormBuilder, private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router) {

    this.formGroupCourse = formBuilder.group({
      id: [],
      name: [, [Validators.required, Validators.pattern(/\S/)]],
      workload: ['', [Validators.required]],
      duration: [, [Validators.required]]
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.getCourseById(id);
  }

  getCourseById(id: number) {
    this.courseService.getCourse(id).subscribe({
      next: data => {
        this.formGroupCourse.setValue(data);
        this.isEditing = true;
      }
    })
  }


  save() {
    this.submitted = true;
    if (this.isEditing) {
      if (this.formGroupCourse.valid) {
        this.courseService.update(this.formGroupCourse.value).subscribe({
          next: () => {
            this.router.navigate(['coordenador/exibir-curso']);
          }
        })
      }
    }

    else {
      this.courseService.save(this.formGroupCourse.value).subscribe({
        next: () => {
          this.router.navigate(['coordenador/exibir-curso']);
        }
      })
    }

  }

  cancel() {
    this.router.navigate(['coordenador/exibir-curso']);
  }

  get name(): any {
    return this.formGroupCourse.get("name");
  }
  get workload(): any {
    return this.formGroupCourse.get("workload");
  }
  get duration(): any {
    return this.formGroupCourse.get("duration");
  }
}
