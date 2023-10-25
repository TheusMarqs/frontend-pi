import { LoginComponent } from './login/login.component';
import { ProfessorComponent } from './professor/professor.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { CoordinatorComponent } from './coordinator/coordinator.component';
import { RegisterProfessorComponent } from './coordinator/register-professor/register-professor.component';
import { ShowProfessorComponent } from './coordinator/show-professor/show-professor.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'professor', component: ProfessorComponent},
  {path: 'aluno', component: StudentComponent},
  {path: 'coordenador', component: CoordinatorComponent},
  {path: 'coordenador/cadastro-professor', component: RegisterProfessorComponent},
  {path: 'coordenador/show-professor', component: ShowProfessorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
