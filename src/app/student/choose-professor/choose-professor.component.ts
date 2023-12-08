import { Component, OnInit } from '@angular/core';
import { ProfessorService } from 'src/app/professor.service';
import { Professor } from 'src/app/professors';

@Component({
  selector: 'app-choose-professor',
  templateUrl: './choose-professor.component.html',
  styleUrls: ['./choose-professor.component.css']
})
export class ChooseProfessorComponent implements OnInit{
  professors: Professor[] = [];

  constructor(private professorService: ProfessorService){}

  ngOnInit(): void {
      this.loadProfessors();
  }

  loadProfessors() {
    this.professorService.getProfessors().subscribe({
      next: data => this.professors = data
    });
  }
}
