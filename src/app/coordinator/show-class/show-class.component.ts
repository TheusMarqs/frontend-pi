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


  constructor(private teamService: TeamService, private route: ActivatedRoute,){
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.getTeamById(id);
    this.getCourseName(id);
  }

  getTeamById(id: number) {
    this.teamService.getTeam(id).subscribe({
      next: (data) => {
        this.teamById = data
      }
    })
  }

  getCourseName(id: number): string {
    const team = this.teams.find((team) => team.id === id);
    if (team) {
      const course = this.courses.find((course) => course.id === team.course);
      return course ? course.name : 'Curso não encontrado';
    }
    return 'Turma não encontrada';
  }

  
}
