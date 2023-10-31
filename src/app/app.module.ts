import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfessorComponent } from './professor/professor.component';
import { StudentComponent } from './student/student.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderCoordComponent } from './header-coord/header-coord.component';
import { CoordinatorComponent } from './coordinator/coordinator.component';
import { RegisterProfessorComponent } from './coordinator/register-professor/register-professor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowProfessorComponent } from './coordinator/show-professor/show-professor.component';
import { IonicModule } from '@ionic/angular';
import { RegisterClassroomComponent } from './coordinator/register-classroom/register-classroom.component';
import { ShowClassroomComponent } from './coordinator/show-classroom/show-classroom.component';
import { RegisterCourseComponent } from './coordinator/register-course/register-course.component';
import { ShowCourseComponent } from './coordinator/show-course/show-course.component';
import { RegisterTeamComponent } from './coordinator/register-team/register-team.component';
import { ShowTeamComponent } from './coordinator/show-team/show-team.component';
import { RegisterDisciplineComponent } from './coordinator/register-discipline/register-discipline.component';
import { ShowDisciplineComponent } from './coordinator/show-discipline/show-discipline.component';
import { ShowClassComponent } from './coordinator/show-class/show-class.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfessorComponent,
    StudentComponent,
    LoginComponent,
    HeaderCoordComponent,
    CoordinatorComponent,
    RegisterProfessorComponent,
    ShowProfessorComponent,
    RegisterClassroomComponent,
    ShowClassroomComponent,
    RegisterCourseComponent,
    ShowCourseComponent,
    RegisterTeamComponent,
    ShowTeamComponent,
    RegisterDisciplineComponent,
    ShowDisciplineComponent,
    ShowClassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
