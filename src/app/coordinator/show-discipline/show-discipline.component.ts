import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/course.service';
import { Course } from 'src/app/courses';
import { DisciplineService } from 'src/app/discipline.service';
import { Discipline } from 'src/app/disciplines';

@Component({
  selector: 'app-show-discipline',
  templateUrl: './show-discipline.component.html',
  styleUrls: ['./show-discipline.component.css', '../../app.component.css']
})
export class ShowDisciplineComponent {
  disciplines: Discipline[] = [];
  courses: Course[] = [];
  filter: string = '';

  constructor(private disciplineService: DisciplineService, private router: Router, private courseService: CourseService) {
  }


  ngOnInit(): void {
    this.courseService.getCourses().subscribe((courses) => {
      this.courses = courses;
    });
    this.loadDisciplines();
  }

  getCourseName(disciplineId: number): string {
    const discipline = this.disciplines.find((discipline) => discipline.id === disciplineId);
    if (discipline) {
      const course = this.courses.find((course) => course.id === discipline.course);
      return course ? course.name : 'Curso não encontrado';
    }
    return 'Disciplina não encontrada';
  }

  loadDisciplines() {
    this.disciplineService.getDisciplines().subscribe({
      next: data => this.disciplines = data
    });
  }


  create(){
    this.router.navigate(['coordenador/cadastro-disciplina']);
  }

  edit(disciplines: Discipline) {
    this.router.navigate(['coordenador/atualizar-disciplina', disciplines.id]);
  }

  delete(disciplines: Discipline) {
    this.disciplineService.delete(disciplines).subscribe({
      next: () => this.loadDisciplines()
    });
  }
}
