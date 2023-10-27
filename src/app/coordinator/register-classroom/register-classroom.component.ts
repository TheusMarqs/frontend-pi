import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomService } from 'src/app/classroom.service';

@Component({
  selector: 'app-register-classroom',
  templateUrl: './register-classroom.component.html',
  styleUrls: ['./register-classroom.component.css']
})
export class RegisterClassroomComponent implements OnInit {
  formGroupClassroom: FormGroup;
  submitted: boolean = false;
  isEditing: boolean = false;

  constructor(private formBuilder: FormBuilder, private classroomService: ClassroomService,
    private route: ActivatedRoute,
    private router: Router) {

    this.formGroupClassroom = formBuilder.group({
      id: [],
      number: [, [Validators.required]],
      type: ['', [Validators.required, Validators.pattern(/\S/)]],
      capacity: [, [Validators.required]]
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.getClassroomById(id);
  }

  getClassroomById(id: number) {
    this.classroomService.getClassroom(id).subscribe({
      next: data => {
        this.formGroupClassroom.setValue(data);
        this.isEditing = true;
      }
    })
  }


  save() {
    this.submitted = true;
    if (this.isEditing) {
      if (this.formGroupClassroom.valid) {
        this.classroomService.update(this.formGroupClassroom.value).subscribe({
          next: () => {
            this.router.navigate(['coordenador/exibir-sala']);
          }
        })
      }
    }

    else {
      this.classroomService.save(this.formGroupClassroom.value).subscribe({
        next: () => {
          this.router.navigate(['coordenador/exibir-sala']);
        }
      })
    }

  }

  cancel() {
    this.router.navigate(['coordenador/exibir-sala']);
  }

  get number(): any {
    return this.formGroupClassroom.get("number");
  }
  get type(): any {
    return this.formGroupClassroom.get("type");
  }
  get capacity(): any {
    return this.formGroupClassroom.get("capacity");
  }
}
