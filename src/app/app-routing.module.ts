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
import { ShowDisciplineComponent } from './coordinator/show-discipline/show-discipline.component';
import { ShowScheduleComponent } from './coordinator/show-schedule/show-schedule.component';
import { RegisterScheduleComponent } from './coordinator/register-schedule/register-schedule.component';
import { RegisterTimeComponent } from './coordinator/register-time/register-time.component';
import { ShowTimeComponent } from './coordinator/show-time/show-time.component';
import { ShowStudentScheduleComponent } from './student/show-student-schedule/show-student-schedule.component';
import { ShowProfessorScheduleComponent } from './student/show-professor-schedule/show-professor-schedule.component';
import { ChooseProfessorComponent } from './student/choose-professor/choose-professor.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'professor', component: ProfessorComponent},

  //ALUNO
  {path: 'aluno', component: StudentComponent},
  {path: 'aluno/exibir-agendamento-aluno/:id', component: ShowStudentScheduleComponent},
  {path: 'aluno/escolher-professor', component: ChooseProfessorComponent},
  {path: 'aluno/exibir-agendamento-professor/:id', component: ShowProfessorScheduleComponent},

  //COORDENADOR
  //Agendamento de aulas
  {path: 'coordenador', component: CoordinatorComponent},
  {path: 'coordenador/exibir-agendamento/:id', component: ShowScheduleComponent},
  {path: 'coordenador/cadastro-agendamento', component: RegisterScheduleComponent},
  {path: 'coordenador/cadastro-agendamento/:id/:id', component: RegisterScheduleComponent},
  {path: 'coordenador/atualizar-agendamento/:id/:id', component: RegisterScheduleComponent},

  //Professores
  {path: 'coordenador/cadastro-professor', component: RegisterProfessorComponent},
  {path: 'coordenador/exibir-professor', component: ShowProfessorComponent},
  {path: 'coordenador/atualizar-professor/:id', component: RegisterProfessorComponent},

  //Salas
  {path: 'coordenador/cadastro-sala', component: RegisterClassroomComponent},
  {path: 'coordenador/exibir-sala', component: ShowClassroomComponent},
  {path: 'coordenador/atualizar-sala/:id', component: RegisterClassroomComponent},

  //Cursos
  {path: 'coordenador/cadastro-curso', component: RegisterCourseComponent},
  {path: 'coordenador/exibir-curso', component: ShowCourseComponent},
  {path: 'coordenador/atualizar-curso/:id', component: RegisterCourseComponent},

  //Turmas
  {path: 'coordenador/cadastro-turma', component: RegisterTeamComponent},
  {path: 'coordenador/exibir-turma', component: ShowTeamComponent},
  {path: 'coordenador/atualizar-turma/:id', component: RegisterTeamComponent},

  //Disciplinas
  {path: 'coordenador/cadastro-disciplina', component: RegisterDisciplineComponent},
  {path: 'coordenador/exibir-disciplina', component: ShowDisciplineComponent},
  {path: 'coordenador/atualizar-disciplina/:id', component: RegisterDisciplineComponent},

  //Horarios
  {path: 'coordenador/cadastro-horario', component: RegisterTimeComponent},
  {path: 'coordenador/atualizar-horario/:id', component: RegisterTimeComponent},
  {path: 'coordenador/exibir-horario', component: ShowTimeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
