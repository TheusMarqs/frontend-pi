import { Component, OnInit } from '@angular/core';
import { Team } from '../teams';
import { TeamService } from '../team.service';
import { Course } from '../courses';
import { CourseService } from '../course.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coordinator',
  templateUrl: './coordinator.component.html',
  styleUrls: ['./coordinator.component.css', '../app.component.css']
})
export class CoordinatorComponent implements OnInit{
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
      this.router.navigate(['/coordenador/exibir-agendamento', this.selectedTeamId]);
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

  getAllTeams(){
    this.teamService.getTeams().subscribe((teams) => {
      this.teams = teams;
    });
  }

}
