import { RegisterDisciplineComponent } from './coordinator/register-discipline/register-discipline.component';
import { ShowTeamComponent } from './coordinator/show-team/show-team.component';
import { RegisterCourseComponent } from './coordinator/register-course/register-course.component';
import { LoginComponent } from './login/login.component';
import { ProfessorComponent } from './professor/professor.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { CoordinatorComponent } from './coordinator/coordinator.component';
import { RegisterProfessorComponent } from './coordinator/register-professor/register-professor.component';
import { ShowProfessorComponent } from './coordinator/show-professor/show-professor.component';
import { RegisterClassroomComponent } from './coordinator/register-classroom/register-classroom.component';
import { ShowClassroomComponent } from './coordinator/show-classroom/show-classroom.component';
import { ShowCourseComponent } from './coordinator/show-course/show-course.component';
import { RegisterTeamComponent } from './coordinator/register-team/register-team.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'professor', component: ProfessorComponent},
  {path: 'aluno', component: StudentComponent},
  {path: 'coordenador', component: CoordinatorComponent},
  {path: 'coordenador/cadastro-professor', component: RegisterProfessorComponent},
  {path: 'coordenador/exibir-professor', component: ShowProfessorComponent},
  {path: 'coordenador/atualizar-professor/:id', component: RegisterProfessorComponent},
  {path: 'coordenador/cadastro-sala', component: RegisterClassroomComponent},
  {path: 'coordenador/exibir-sala', component: ShowClassroomComponent},
  {path: 'coordenador/atualizar-sala/:id', component: RegisterClassroomComponent},
  {path: 'coordenador/cadastro-curso', component: RegisterCourseComponent},
  {path: 'coordenador/exibir-curso', component: ShowCourseComponent},
  {path: 'coordenador/atualizar-curso/:id', component: RegisterCourseComponent},
  {path: 'coordenador/cadastro-turma', component: RegisterTeamComponent},
  {path: 'coordenador/exibir-turma', component: ShowTeamComponent},
  {path: 'coordenador/atualizar-turma/:id', component: RegisterTeamComponent},
  {path: 'coordenador/cadastro-disciplina', component: RegisterDisciplineComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
