import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfessorService } from 'src/app/professor.service';
import { Professor } from 'src/app/professors';

@Component({
  selector: 'app-show-professor',
  templateUrl: './show-professor.component.html',
  styleUrls: ['./show-professor.component.css']
})
export class ShowProfessorComponent {
  professors: Professor[] = [];

  constructor(private professorService: ProfessorService, private router: Router) {
  }


  ngOnInit(): void {
    this.loadProfessors();
  }

  loadProfessors() {
    this.professorService.getProfessors().subscribe({
      next: data => this.professors = data
    });
  }


  create(){
    this.router.navigate(['coordenador/cadastro-professor']);
  }

  edit(professors: Professor) {
    this.router.navigate(['clientDetails', professors.id]);
  }

  delete(professors: Professor) {
    this.professorService.delete(professors).subscribe({
      next: () => this.loadProfessors()
    });
  }
}
