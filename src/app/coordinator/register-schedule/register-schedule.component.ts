import { Schedule } from './../../schedules';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomService } from 'src/app/classroom.service';
import { Classroom } from 'src/app/classrooms';
import { DisciplineService } from 'src/app/discipline.service';
import { Discipline } from 'src/app/disciplines';
import { ProfessorService } from 'src/app/professor.service';
import { Professor } from 'src/app/professors';
import { ScheduleService } from 'src/app/schedule.service';
import { TimeService } from 'src/app/time.service';
import { Time } from 'src/app/times';

@Component({
  selector: 'app-register-schedule',
  templateUrl: './register-schedule.component.html',
  styleUrls: ['./register-schedule.component.css', '../../app.component.css'],
})
export class RegisterScheduleComponent implements OnInit {
  professors: Professor[] = [];
  classrooms: Classroom[] = [];
  disciplines: Discipline[] = [];
  times: Time[] = [];
  submitted: boolean = false;
  isEditing: boolean = false;
  formGroupSchedule: FormGroup;
  timesLength: number = 0;
  weekDay: string = '';
  teamId: number = 0;

  constructor(
    private professorService: ProfessorService,
    private classroomService: ClassroomService,
    private disciplineService: DisciplineService,
    private formBuilder: FormBuilder,
    private scheduleService: ScheduleService,
    private route: ActivatedRoute,
    private router: Router,
    private timeService: TimeService
  ) {
    this.formGroupSchedule = formBuilder.group({
      id: [],
      weekday: [, [Validators.required, Validators.pattern(/\S/)]],
      time: [, [Validators.required]],
      professor: ['', [Validators.required]],
      classroom: [, [Validators.required]],
      discipline: [, [Validators.required]],
      team: [, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadTimes();
    this.loadClassrooms();
    this.loadDisciplines();
    this.loadProfessors();

    const currentUrl = this.route.snapshot.url.join('/');
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.showDayById(id);
      this.getTeamByUrl(id);
    }

    // Verifique se a URL contém a string desejada
    if (currentUrl.includes('atualizar-agendamento')) {
      // Faça alguma coisa se a URL for "atualizar-agendamento"
      this.getScheduleById(id);
    }
  }

  getTeamByUrl(id: number){
    this.teamId = id;
  }

  goBack() {
    const urlSegments = this.route.snapshot.url;

    // Obtém os valores diretamente dos segmentos da URL
    const id1 = Number(urlSegments[2]);  // 1º segmento depois de "coordenador/cadastro-agendamento/"
    const id2 = Number(urlSegments[3]);  // 2º segmento depois de "coordenador/cadastro-agendamento/"

    // Escolha qual parâmetro usar para a navegação
    const selectedId = isNaN(id1) ? id2 : id1;

    this.router.navigate(['coordenador/exibir-agendamento', selectedId]);
  }




  showDayById(id: number) {
    switch (id) {
      case 1:
        this.weekDay = 'Segunda-feira';
        break;

      case 2:
        this.weekDay = 'Terça-feira';
        break;

      case 3:
        this.weekDay = 'Quarta-feira';
        break;

      case 4:
        this.weekDay = 'Quinta-feira';
        break;

      case 5:
        this.weekDay = 'Sexta-feira';
        break;

      case 6:
        this.weekDay = 'Sábado';
        break;
    }
  }

  getScheduleById(id: number) {
    this.scheduleService.getSchedule(id).subscribe({
      next: (data) => {
        this.formGroupSchedule.setValue(data);
        this.isEditing = true;
      },
    });
  }

  save() {
    this.submitted = true;
    if (this.isEditing) {
      if (this.formGroupSchedule.valid) {
        this.scheduleService.update(this.formGroupSchedule.value).subscribe({
          next: () => {
            this.goBack();
          },
        });
      }
    } else {
      this.scheduleService.save({
        ...this.formGroupSchedule.value,
        weekday: this.weekDay,
        team: this.teamId
      }).subscribe({
        next: () => {
          this.goBack();
        },
      });

    }
  }

  cancel() {
    this.goBack();
  }

  loadTimes() {
    this.timeService.getTimes().subscribe({
      next: (data) => {
        this.times = data;
        this.timesLength = data.length;
      },
      error: (error) => {
        console.error('Erro ao carregar os horários:', error);
      },
    });
  }

  loadProfessors() {
    this.professorService.getProfessors().subscribe({
      next: (data) => (this.professors = data),
    });
  }
  loadClassrooms() {
    this.classroomService.getClassrooms().subscribe({
      next: (data) => (this.classrooms = data),
    });
  }
  loadDisciplines() {
    this.disciplineService.getDisciplines().subscribe({
      next: (data) => (this.disciplines = data),
    });
  }

  get professor(): any {
    return this.formGroupSchedule.get('professor');
  }

  get classroom(): any {
    return this.formGroupSchedule.get('classroom');
  }
  get discipline(): any {
    return this.formGroupSchedule.get('discipline');
  }
}
