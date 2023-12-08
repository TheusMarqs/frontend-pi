import { CourseService } from 'src/app/course.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/courses';
import { TeamService } from 'src/app/team.service';
import { Time } from 'src/app/times';
import { TimeService } from 'src/app/time.service';

@Component({
  selector: 'app-register-team',
  templateUrl: './register-team.component.html',
  styleUrls: ['./register-team.component.css', '../../app.component.css']
})

export class RegisterTeamComponent {
  formGroupTeam: FormGroup;
  submitted: boolean = false;
  isEditing: boolean = false;
  courses: Course[] = [];
  times: Time[] = [];

  constructor(private formBuilder: FormBuilder,
    private teamService: TeamService,
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private timeService: TimeService) {

    this.formGroupTeam = formBuilder.group({
      id: [],
      course: [, [Validators.required]],
      students: [, [Validators.required]],
      semester: [, [Validators.required]],
      period: ['', [Validators.required, Validators.pattern(/^[A-Za-záâãàéêíóôõúçñ ]+$/), Validators.pattern(/\S/)]],
      time: this.formBuilder.array([]),
    });
  }

  get timeArray(): FormArray {
    return this.formGroupTeam.get('time') as FormArray;
  }


  ngOnInit(): void {
    this.loadCourses();
    this.loadTimes();
    const id = Number(this.route.snapshot.paramMap.get("id"));
    if(id){
      this.getTeamById(id);
    }

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

  getTeamById(id: number) {
    this.teamService.getTeam(id).subscribe({
      next: data => {
        while (this.timeArray.length !== 0) {
          this.timeArray.removeAt(0);
        }

        this.formGroupTeam.setValue({
          id: data.id,
          course: data.course,
          students: data.students,
          semester: data.semester,
          period: data.period,
          time: []
        });

        if (Array.isArray(data.time)) {
          data.time.forEach(timeId => {
            this.timeArray.push(this.formBuilder.control(timeId));
          });
        }

        this.isEditing = true;
      }
    });
  }




  save() {
    this.submitted = true;

    if (this.formGroupTeam.valid) {
      if (this.timeArray.length > 0) {
        if (this.isEditing) {
          this.teamService.update(this.formGroupTeam.value).subscribe({
            next: () => {
              this.router.navigate(['coordenador/exibir-turma']);
            }
          });
        } else {
          this.teamService.save(this.formGroupTeam.value).subscribe({
            next: () => {
              this.router.navigate(['coordenador/exibir-turma']);
            }
          });
        }
      } else {
        // Caso nenhum horário tenha sido selecionado, mostre uma mensagem ou trate conforme necessário
        console.log('Selecione pelo menos um horário antes de salvar.');
      }
    }
  }


  toggleTime(timeId: number): void {
    const timeArray = this.timeArray;

    // Check if the timeId is already in the array
    const index = timeArray.value.indexOf(timeId);

    if (index === -1) {
      // If not in the array, add it
      timeArray.push(this.formBuilder.control(timeId));
    } else {
      // If already in the array, remove it
      timeArray.removeAt(index);
    }
  }

  cancel() {
    this.router.navigate(['coordenador/exibir-turma']);
  }

  get course(): any {
    return this.formGroupTeam.get("course");
  }

  get students(): any {
    return this.formGroupTeam.get("students");
  }
  get semester(): any {
    return this.formGroupTeam.get("semester");
  }
  get period(): any {
    return this.formGroupTeam.get("period");
  }
  get time(): any {
    return this.formGroupTeam.get("time");
  }
}
