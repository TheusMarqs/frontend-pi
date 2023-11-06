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

@Component({
  selector: 'app-register-schedule',
  templateUrl: './register-schedule.component.html',
  styleUrls: ['./register-schedule.component.css','../../app.component.css']
})
export class RegisterScheduleComponent implements OnInit{
  professors: Professor[] = [];
  classrooms: Classroom[] = [];
  disciplines: Discipline[] = [];
  formGroupSchedule: FormGroup;
  submitted: boolean = false;
  isEditing: boolean = false;

  constructor(private professorService: ProfessorService,
    private classroomService: ClassroomService,
    private disciplineService: DisciplineService,
    private formBuilder: FormBuilder,
    private scheduleService: ScheduleService,
    private route: ActivatedRoute,
    private router: Router){

      this.formGroupSchedule = formBuilder.group({
        id: [],
        day: [, [Validators.required, Validators.pattern(/\S/)]],
        start_time: [, [Validators.required, Validators.pattern(/\S/)]],
        end_time: [, [Validators.required, Validators.pattern(/\S/)]],
        professor: ['', [Validators.required]],
        classroom: [, [Validators.required]],
        discipline: [, [Validators.required]],
        team: [, [Validators.required]],
      });
    }

  ngOnInit(): void {
    this.loadClassrooms();
    this.loadDisciplines();
    this.loadProfessors();
    const id = Number(this.route.snapshot.paramMap.get("id"));
    if(id){
      this.getScheduleById(id);
    }
  }

  getScheduleById(id: number) {
    this.scheduleService.getSchedule(id).subscribe({
      next: data => {
        this.formGroupSchedule.setValue(data);
        this.isEditing = true;
      }
    })
  }


  save() {
    this.submitted = true;
    if (this.isEditing) {
      if (this.formGroupSchedule.valid) {
        this.scheduleService.update(this.formGroupSchedule.value).subscribe({
          next: () => {
            this.router.navigate(['coordenador/exibir-agendamento']);
          }
        })
      }
    }

    else {
      this.scheduleService.save(this.formGroupSchedule.value).subscribe({
        next: () => {
          this.router.navigate(['coordenador/exibir-agendamento']);
        }
      })
    }

  }

  cancel() {
    this.router.navigate(['coordenador/exibir-agendamento']);
  }

  loadProfessors(){
    this.professorService.getProfessors().subscribe({
      next: data => this.professors = data
    });
  }
  loadClassrooms(){
    this.classroomService.getClassrooms().subscribe({
      next: data => this.classrooms = data
    });
  }
  loadDisciplines(){
    this.disciplineService.getDisciplines().subscribe({
      next: data => this.disciplines = data
    });
  }

  get professor(): any {
    return this.formGroupSchedule.get("professor");
  }

  get classroom(): any {
    return this.formGroupSchedule.get("classroom");
  }
  get discipline(): any {
    return this.formGroupSchedule.get("discipline");
  }
}
