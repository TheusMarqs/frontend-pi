import { Schedule } from './../../schedules';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  weekDay: string = '';
  weekDayId: number = 0;
  teamId: number = 0;
  formGroups: FormGroup[] = [];
  timesLength: number = 0;
 
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
      scheduleArray: this.formBuilder.array([])
    });
  }
 
  ngOnInit(): void {
    this.loadTimes();
    this.loadClassrooms();
    this.loadDisciplines();
    this.loadProfessors();

    const currentUrl = this.route.snapshot.url.join('/');
    const id = Number(this.route.snapshot.paramMap.get('id'));

    const urlSegments = this.route.snapshot.url;

    // Obtém os valores diretamente dos segmentos da URL
    const id1 = Number(urlSegments[2]);  // 1º segmento depois de "coordenador/cadastro-agendamento/"

    if (urlSegments) {
      this.getTeamByUrl(id1)
    }

    if (id) {
      this.weekDayId = id;
      this.showDayById(id);
    }

    // Verifique se a URL contém a string desejada
    if (currentUrl.includes('atualizar-agendamento') && this.teamId !== 0) {
      // Faça alguma coisa se a URL for "atualizar-agendamento"
      this.getScheduleById(id);
    }
}

 
 
  getTeamByUrl(id: number) {
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
 
  getScheduleById(dayId: number) {
    this.scheduleService.getSchedulesByDayOfWeek(this.teamId, dayId).subscribe({
      next: data => {
        // Use patchValue para preencher apenas campos presentes no objeto retornado
        this.formGroupSchedule.patchValue({
          scheduleArray: data,
        });
        this.isEditing = true;
      }
    });
  }
  
 
  save() {
    const scheduleArray = this.formGroupSchedule.value.scheduleArray.map((scheduleItem: any) => ({
      ...scheduleItem,
      weekday: this.weekDay,
      team: this.teamId,
    }));
    this.submitted = true;
    if (this.isEditing) {
      console.log("form: ", this.formGroupSchedule.value);
      if (this.formGroupSchedule.valid) {
        this.scheduleService.update(scheduleArray, this.weekDayId).subscribe({
          next: () => {
            this.goBack();
          },
        });
      }
    } else {
      
 
      this.scheduleService.save(scheduleArray).subscribe({
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
 
        for (let i = 0; i < this.timesLength; i++) {
          this.addScheduleItem();
        };
      },
      error: (error) => {
        console.error('Erro ao carregar os horários:', error);
      },
    });
  }
 
  getScheduleArrayControls(): AbstractControl[] {
    const scheduleArray = this.formGroupSchedule.get('scheduleArray') as FormArray;
    return scheduleArray ? scheduleArray.controls : [];
  }
 
  addScheduleItem() {
    const scheduleArray = this.formGroupSchedule.get('scheduleArray') as FormArray;
 
    // Adicione os controles do item à matriz, usando os dados do registro 'time'
    scheduleArray.push(this.formBuilder.group({
      time: [, [Validators.required]],
      professor: [, [Validators.required]],
      classroom: [, [Validators.required]],
      discipline: [, [Validators.required]],
    }));
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
 
  // get professor(): any {
  //   return this.formGroupSchedule.get('professor');
  // }
 
  // get classroom(): any {
  //   return this.formGroupSchedule.get('classroom');
  // }
  // get discipline(): any {
  //   return this.formGroupSchedule.get('discipline');
  // }
}