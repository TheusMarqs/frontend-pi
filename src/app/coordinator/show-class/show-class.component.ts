import { CourseService } from './../../course.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/courses';
import { TeamService } from 'src/app/team.service';
import { Team } from 'src/app/teams';

@Component({
  selector: 'app-show-class',
  templateUrl: './show-class.component.html',
  styleUrls: ['./show-class.component.css']
})
export class ShowClassComponent implements OnInit{
  teams: Team[] = [];
  courses: Course[] = [];
  teamById: Team | null = null;
  courseById: string = '';


  constructor(private teamService: TeamService, private route: ActivatedRoute, private courseService: CourseService){
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.getTeamById(id);
  }


  getTeamById(teamId: number) {
    this.teamService.getTeam(teamId).subscribe({
      next: (team) => {
        if (team) {
          const courseId = team.course; // Obtém o ID do curso associado à turma
          this.getCourseName(courseId);
          this.teamById = team
        } else {
          console.error('Turma não encontrada');
        }
      },
      error: (error) => {
        console.error('Erro ao buscar turma', error);
      }
    });
  }

  getCourseName(courseId: number) {
    this.courseService.getCourseName(courseId).subscribe({
      next: (courseName) => {
        if (courseName) {
          // courseName contém o nome do curso associado à turma
          this.courseById = courseName;
        } else {
          console.error('Nome do curso não encontrado');
        }
      },
      error: (error) => {
        console.error('Erro ao buscar nome do curso', error);
      }
    });
  }

}
