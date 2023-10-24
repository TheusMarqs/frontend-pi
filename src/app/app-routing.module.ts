import { LoginComponent } from './login/login.component';
import { ProfessorComponent } from './professor/professor.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { CoordinatorComponent } from './coordinator/coordinator.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'professor', component: ProfessorComponent},
  {path: 'student', component: StudentComponent},
  {path: 'coordinator-home', component: CoordinatorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
