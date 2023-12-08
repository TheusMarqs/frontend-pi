import { Component, OnInit } from '@angular/core';
import { Team } from '../teams';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { CourseService } from '../course.service';
import { Course } from '../courses';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css', '../app.component.css']
})
export class StudentComponent  implements OnInit{
  teams: Team[] = [];
  teamCourseMap: { [key: number]: string } = {};
  selectedTeamId: number | null = null;

  constructor(private teamService: TeamService, private courseService: CourseService, private router: Router){
  }
  ngOnInit(): void {
    forkJoin([this.teamService.getTeams(), this.courseService.getCourses()]).subscribe(
      ([teams, courses]) => {
        this.teams = teams;
        this.createTeamCourseMap(courses);
      }
    );
  }

  navigateToSelectedTeam(): void {
    if (this.selectedTeamId !== null && this.selectedTeamId.toString() !== '0') {
      this.router.navigate(['/aluno/exibir-agendamento-aluno', this.selectedTeamId]);
    }
  }

  createTeamCourseMap(courses: Course[]): void {
    for (const team of this.teams) {
      const course = courses.find((c) => c.id === team.course);
      if (course) {
        this.teamCourseMap[team.id] = course.name;
      }
    }
  }

}
