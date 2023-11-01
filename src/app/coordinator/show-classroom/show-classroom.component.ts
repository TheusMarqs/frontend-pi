import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClassroomService } from 'src/app/classroom.service';
import { Classroom } from 'src/app/classrooms';

@Component({
  selector: 'app-show-classroom',
  templateUrl: './show-classroom.component.html',
  styleUrls: ['./show-classroom.component.css', '../../app.component.css']
})
export class ShowClassroomComponent {
  classrooms: Classroom[] = [];
  filter: string = '';

  constructor(private classroomService: ClassroomService, private router: Router) {
  }


  ngOnInit(): void {
    this.loadClassrooms();
  }

  loadClassrooms() {
    this.classroomService.getClassrooms().subscribe({
      next: data => this.classrooms = data
    });
  }


  create(){
    this.router.navigate(['coordenador/cadastro-sala']);
  }

  edit(classrooms: Classroom) {
    this.router.navigate(['coordenador/atualizar-sala', classrooms.id]);
  }

  delete(classrooms: Classroom) {
    this.classroomService.delete(classrooms).subscribe({
      next: () => this.loadClassrooms()
    });
  }
}
