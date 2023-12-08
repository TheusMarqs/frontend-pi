import { ScheduleService } from './../../schedule.service';
import { Schedule } from './../../schedules';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { ProfessorService } from 'src/app/professor.service';
import { ClassroomService } from 'src/app/classroom.service';
import { CourseService } from 'src/app/course.service';
import { DisciplineService } from 'src/app/discipline.service';
import { TeamService } from 'src/app/team.service';
import { TimeService } from 'src/app/time.service';
import { Classroom } from 'src/app/classrooms';
import { Time } from 'src/app/times';
import { Course } from 'src/app/courses';
import { Discipline } from 'src/app/disciplines';
import { Professor } from 'src/app/professors';
import { Team } from 'src/app/teams';

@Component({
  selector: 'app-show-professor-schedule',
  templateUrl: './show-professor-schedule.component.html',
  styleUrls: ['./show-professor-schedule.component.css', '../../app.component.css'],
})
export class ShowProfessorScheduleComponent {
  filter: string = '';
  schedules: Schedule[] = [];
  filteredSchedule: Schedule[] = [];
  classrooms: Classroom[] = [];
  times: Time[] = [];
  professors: Professor[] = [];
  disciplines: Discipline[] = [];
  courses: Course[] = [];
  courseById: string = '';
  teams: Team[] = [];
  professorName: string = '';

  constructor(private teamService: TeamService,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private scheduleService: ScheduleService,
    private router: Router,
    private timeService: TimeService,
    private professorService: ProfessorService,
    private disciplineService: DisciplineService,
    private classroomService: ClassroomService) {
  }

  ngOnInit(): void {
    this.loadTimes();
    this.loadSchedules();
    this.loadProfessors();
    this.loadDisciplines();
    this.loadTeams();
    this.loadClassrooms();
  }

  loadSchedules() {
    this.scheduleService.getSchedules().subscribe({
      next: (data) => {
        this.schedules = data;
        // Chame o filterByTeam aqui para garantir que ele seja chamado após o carregamento
        const id = Number(this.route.snapshot.paramMap.get("id"));
        if (id){
          this.filterByProfessor(id);
        }
      },
    });
  }

  loadProfessors(){
    this.professorService.getProfessors().subscribe({
      next: (data) => (this.professors = data),
    });
  }

  loadTimes(){
    this.timeService.getTimes().subscribe((times) => {
      this.times = times;
    });
  }

  getProfessorName(scheduleId: number): string {
    const schedule = this.schedules.find((schedule) => schedule.id === scheduleId);
    if (schedule) {
      const professor = this.professors.find((professor) => professor.id === schedule.professor);
      return professor ? professor.name : 'Professor não encontrado';
    }
    return 'Agendamento não encontrado';
  }

  getDisciplineName(scheduleId: number): string {
    const schedule = this.schedules.find((schedule) => schedule.id === scheduleId);
    if (schedule) {
      const discipline = this.disciplines.find((discipline) => discipline.id === schedule.discipline);
      return discipline ? discipline.name : 'Disciplina não encontrada';
    }
    return 'Agendamento não encontrado';
  }

  getClassroomNumber(scheduleId: number): number | string {
    const schedule = this.schedules.find((schedule) => schedule.id === scheduleId);
    if (schedule) {
      const classroom = this.classrooms.find((classroom) => classroom.id === schedule.classroom);
      return classroom ? classroom.number : 'Sala não encontrada';
    }
    return 'Agendamento não encontrado';
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

  getTimeString(scheduleId: number): string {
    const schedule = this.schedules.find((schedule) => schedule.id === scheduleId);

    if (schedule) {
      const time = this.times.find((t) => t.id === schedule.time);
      return time ? time.time : 'Horário não encontrado';
    }

    return 'Turma não encontrada';
  }

  loadDisciplines(){
    this.disciplineService.getDisciplines().subscribe({
      next: (data) => (this.disciplines = data),
    });
  }

  loadClassrooms(){
    this.classroomService.getClassrooms().subscribe({
      next: (data) => (this.classrooms = data),
    });
  }

  loadTeams(){
    this.teamService.getTeams().subscribe({
      next: (data) => (this.teams = data),
    });
  }

  filterByProfessor(professorId: number) {
    const weekdaysOrder = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    this.filteredSchedule = this.schedules
      .filter(schedule => schedule.professor === professorId)
      .sort((a, b) => {
        const dayA = weekdaysOrder.indexOf(a.weekday);
        const dayB = weekdaysOrder.indexOf(b.weekday);
        return dayA - dayB;
      });

  }


}
