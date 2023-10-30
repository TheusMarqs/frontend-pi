import { Component } from '@angular/core';
import { Course } from 'src/app/courses';
import { CourseService } from 'src/app/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-course',
  templateUrl: './show-course.component.html',
  styleUrls: ['./show-course.component.css', '../../app.component.css']
})
export class ShowCourseComponent {
  courses: Course[] = [];

  constructor(private courseService: CourseService, private router: Router) {
  }


  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe({
      next: data => this.courses = data
    });
  }


  create(){
    this.router.navigate(['coordenador/cadastro-curso']);
  }

  edit(courses: Course) {
    this.router.navigate(['coordenador/atualizar-curso', courses.id]);
  }

  delete(courses: Course) {
    this.courseService.delete(courses).subscribe({
      next: () => this.loadCourses()
    });
  }
}
