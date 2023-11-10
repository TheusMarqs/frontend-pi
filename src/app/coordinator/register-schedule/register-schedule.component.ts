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
  styleUrls: ['./register-schedule.component.css', '../../app.component.css']
})
export class RegisterScheduleComponent implements OnInit {
  professors: Professor[] = [];
  classrooms: Classroom[] = [];
  disciplines: Discipline[] = [];
  times: Time[] = [];
  submitted: boolean = false;
  isEditing: boolean = false;
  formGroups: FormGroup[] = [];
  timesLength: number = 0;

  constructor(private professorService: ProfessorService,
    private classroomService: ClassroomService,
    private disciplineService: DisciplineService,
    private formBuilder: FormBuilder,
    private scheduleService: ScheduleService,
    private route: ActivatedRoute,
    private router: Router,
    private timeService: TimeService) {

    for (let i = 0; i < this.timesLength; i++) {
      const formGroup = formBuilder.group({
        id: [],
        day: [, [Validators.required, Validators.pattern(/\S/)]],
        time: [, [Validators.required]],
        professor: ['', [Validators.required]],
        classroom: [, [Validators.required]],
        discipline: [, [Validators.required]],
        team: [, [Validators.required]],
      });

      this.formGroups.push(formGroup);
    }
    
  }

  ngOnInit(): void {
    this.loadTimes();
    this.loadClassrooms();
    this.loadDisciplines();
    this.loadProfessors();
    const id = Number(this.route.snapshot.paramMap.get("id"));
    if (id) {
      this.getScheduleById(id);
    }
  }



  getScheduleById(id: number) {
    this.scheduleService.getSchedule(id).subscribe({
      next: data => {
        this.formGroups[0].setValue(data);
        this.isEditing = true;
      }
    })
  }


  save() {
    this.submitted = true;
    if (this.isEditing) {
      if (this.formGroups[0].valid) {
        this.scheduleService.update(this.formGroups[0].value).subscribe({
          next: () => {
            this.router.navigate(['coordenador/exibir-agendamento']);
          }
        })
      }
    }

    else {
      this.scheduleService.save(this.formGroups[0].value).subscribe({
        next: () => {
          this.router.navigate(['coordenador/exibir-agendamento']);
        }
      })
    }

  }

  cancel() {
    this.router.navigate(['coordenador/exibir-agendamento']);
  }

  loadTimes() {
    this.timeService.getTimes().subscribe({
      next: data => {
        this.times = data;
        this.timesLength = data.length;
        console.log(this.timesLength);
      },
      error: error => {
        console.error('Erro ao carregar os horários:', error);
      }
    });
  }
  

  loadProfessors() {
    this.professorService.getProfessors().subscribe({
      next: data => this.professors = data
    });
  }
  loadClassrooms() {
    this.classroomService.getClassrooms().subscribe({
      next: data => this.classrooms = data
    });
  }
  loadDisciplines() {
    this.disciplineService.getDisciplines().subscribe({
      next: data => this.disciplines = data
    });
  }

  get professor(): any {
    return this.formGroups[0].get("professor");
  }

  get classroom(): any {
    return this.formGroups[0].get("classroom");
  }
  get discipline(): any {
    return this.formGroups[0].get("discipline");
  }
}
