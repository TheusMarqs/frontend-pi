import { CourseService } from '../../course.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/courses';
import { ScheduleService } from 'src/app/schedule.service';
import { Schedule } from 'src/app/schedules';
import { TeamService } from 'src/app/team.service';
import { Team } from 'src/app/teams';

@Component({
  selector: 'app-show-schedule',
  templateUrl: './show-schedule.component.html',
  styleUrls: ['./show-schedule.component.css', '../../app.component.css']
})
export class ShowScheduleComponent implements OnInit{
  teams: Team[] = [];
  schedules: Schedule[] = [];
  courses: Course[] = [];
  teamById: Team | null = null;
  courseById: string = '';
  filter: string = '';

  constructor(private teamService: TeamService,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private scheduleService: ScheduleService,
    private router: Router){
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.getTeamById(id);
    this.loadSchedules()
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

  loadSchedules() {
    this.scheduleService.getSchedules().subscribe({
      next: data => this.schedules = data
    });
  }


  create(id: number) {
    const idTeam = Number(this.route.snapshot.paramMap.get("id"));
    this.router.navigate(['coordenador/cadastro-agendamento/', idTeam, id]);
  }

  edit(schedules: Schedule) {
    this.router.navigate(['coordenador/atualizar-agendamento', schedules.id]);
  }

  delete(schedules: Schedule) {
    this.scheduleService.delete(schedules).subscribe({
      next: () => this.loadSchedules()
    });
  }

}
