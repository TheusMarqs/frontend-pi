import { TeamService } from 'src/app/team.service';
import { Component } from '@angular/core';
import { Team } from 'src/app/teams';
import { Router } from '@angular/router';
import { Course } from 'src/app/courses';
import { CourseService } from 'src/app/course.service';
import { Time } from 'src/app/times';
import { TimeService } from 'src/app/time.service';

@Component({
  selector: 'app-show-team',
  templateUrl: './show-team.component.html',
  styleUrls: ['./show-team.component.css', '../../app.component.css']
})
export class ShowTeamComponent {
  teams: Team[] = [];
  courses: Course[] = [];
  times: Time[] = [];
  filter: string = '';

  constructor(private teamService: TeamService, private router: Router, private courseService: CourseService, private timeService: TimeService) {
  }


  ngOnInit(): void {
    this.loadTimes();
    this.loadCourses();
    this.loadTeams();
  }

  loadTimes(){
    this.timeService.getTimes().subscribe((times) => {
      this.times = times;
    });
  }
  
  loadCourses(){
    this.courseService.getCourses().subscribe((courses) => {
      this.courses = courses;
    });
  }

  getCourseName(teamId: number): string {
    const team = this.teams.find((team) => team.id === teamId);
    if (team) {
      const course = this.courses.find((course) => course.id === team.course);
      return course ? course.name : 'Curso não encontrado';
    }
    return 'Turma não encontrada';
  }

  getTimeString(teamId: number): string {
    const team = this.teams.find((team) => team.id === teamId);
  
    if (team) {
      const timeStrings = Array.isArray(team.time)
        ? team.time.map((timeId) => {
            const time = this.times.find((t) => t.id === timeId);
            return time ? time.time : 'Horário não encontrado';
          })
        : ['Horário não encontrado'];
  
      return timeStrings.join(', ');
    }
  
    return 'Turma não encontrada';
  }
  
  
  

  loadTeams() {
    this.teamService.getTeams().subscribe({
      next: data => this.teams = data
    });
  }


  create(){
    this.router.navigate(['coordenador/cadastro-turma']);
  }

  edit(teams: Team) {
    this.router.navigate(['coordenador/atualizar-turma', teams.id]);
  }

  delete(teams: Team) {
    this.teamService.delete(teams).subscribe({
      next: () => this.loadTeams()
    });
  }
}
