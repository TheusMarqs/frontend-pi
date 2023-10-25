import { Component, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessorService } from 'src/app/professor.service';

@Component({
  selector: 'app-register-professor',
  templateUrl: './register-professor.component.html',
  styleUrls: ['./register-professor.component.css']
})
export class RegisterProfessorComponent implements OnInit {

  formGroupProfessor: FormGroup;
  submitted: boolean = false;
  isEditing: boolean = false;

  constructor(private formBuilder: FormBuilder, private professorService: ProfessorService,
    private route: ActivatedRoute,
    private router: Router) {

    this.formGroupProfessor = formBuilder.group({
      id: [],
      name: ['', [Validators.required, Validators.pattern(/\S/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      condition: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.getProfessorById(id);
  }

  getProfessorById(id: number) {
    this.professorService.getProfessor(id).subscribe({
      next: data => {
        this.formGroupProfessor.setValue(data);
        this.isEditing = true;
      }
    })
  }


  save() {
    this.submitted = true;
    if (this.isEditing) {
      if (this.formGroupProfessor.valid) {
        this.professorService.update(this.formGroupProfessor.value).subscribe({
          next: () => {
            this.router.navigate(['clients']);
          }
        })
      }
    }

    else {
      this.professorService.save(this.formGroupProfessor.value).subscribe({
        next: () => {
          this.router.navigate(['clients']);
        }
      })
    }

  }

  cancel() {
    this.router.navigate(['clients']);
  }

  get name(): any {
    return this.formGroupProfessor.get("name");
  }
  get email(): any {
    return this.formGroupProfessor.get("email");
  }
  get password(): any {
    return this.formGroupProfessor.get("password");
  }
  get condition(): any {
    return this.formGroupProfessor.get("condition");
  }

}
