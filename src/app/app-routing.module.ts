import { ProfessorComponent } from './professor/professor.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  {path: 'professor', component: ProfessorComponent},
  {path: 'student', component: StudentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
