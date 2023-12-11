import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeService } from 'src/app/time.service';
import { Time } from 'src/app/times';

@Component({
  selector: 'app-register-time',
  templateUrl: './register-time.component.html',
  styleUrls: ['./register-time.component.css']
})
export class RegisterTimeComponent {
  formGroupTime: FormGroup;
  submitted: boolean = false;
  isEditing: boolean = false;
  times: Time[] = [];

  constructor(private formBuilder: FormBuilder,
    private timeService: TimeService,
    private route: ActivatedRoute,
    private router: Router) {

    this.formGroupTime = formBuilder.group({
      id: [],
      time: ['', [Validators.required, Validators.pattern(/\S/)]],
    });
  }



  ngOnInit(): void {
    this.timeService.getTimes().subscribe((times) => {
      this.times = times;
    });
    const id = Number(this.route.snapshot.paramMap.get("id"));
    if (id) {
      this.getTimeById(id);
    }

  }

  getTimeById(id: number) {
    this.timeService.getTime(id).subscribe({
      next: data => {
        this.formGroupTime.setValue(data);
        this.isEditing = true;
      }
    })
  }


  save() {
    this.submitted = true;
    if (this.isEditing) {
      if (this.formGroupTime.valid) {
        this.timeService.update(this.formGroupTime.value).subscribe({
          next: () => {
            this.router.navigate(['coordenador/exibir-horario']);
          }
        })
      }
    }

    else {
      if (this.formGroupTime.valid) {
        this.timeService.save(this.formGroupTime.value).subscribe({
          next: () => {
            this.router.navigate(['coordenador/exibir-horario']);
          }
        })
      }
    }

  }

  cancel() {
    this.router.navigate(['coordenador/exibir-horario']);
  }

  get time(): any {
    return this.formGroupTime.get("time");
  }
}
