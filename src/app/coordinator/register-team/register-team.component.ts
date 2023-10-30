import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from 'src/app/team.service';

@Component({
  selector: 'app-register-team',
  templateUrl: './register-team.component.html',
  styleUrls: ['./register-team.component.css']
})
export class RegisterTeamComponent {
  formGroupTeam: FormGroup;
  submitted: boolean = false;
  isEditing: boolean = false;

  constructor(private formBuilder: FormBuilder, private teamService: TeamService,
    private route: ActivatedRoute,
    private router: Router) {

    this.formGroupTeam = formBuilder.group({
      id: [],
      course: [, [Validators.required]],
      students: [, [Validators.required]],
      semester: [, [Validators.required]],
      period: ['', [Validators.required, Validators.pattern(/\S/)]],
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.getTeamById(id);
  }

  getTeamById(id: number) {
    this.teamService.getTeam(id).subscribe({
      next: data => {
        this.formGroupTeam.setValue(data);
        this.isEditing = true;
      }
    })
  }


  save() {
    this.submitted = true;
    if (this.isEditing) {
      if (this.formGroupTeam.valid) {
        this.teamService.update(this.formGroupTeam.value).subscribe({
          next: () => {
            this.router.navigate(['coordenador/exibir-professor']);
          }
        })
      }
    }

    else {
      this.teamService.save(this.formGroupTeam.value).subscribe({
        next: () => {
          this.router.navigate(['coordenador/exibir-professor']);
        }
      })
    }

  }

  cancel() {
    this.router.navigate(['coordenador/exibir-professor']);
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
}
