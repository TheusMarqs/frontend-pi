import { TeamService } from 'src/app/team.service';
import { Component } from '@angular/core';
import { Team } from 'src/app/teams';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-team',
  templateUrl: './show-team.component.html',
  styleUrls: ['./show-team.component.css', '../../app.component.css']
})
export class ShowTeamComponent {
  teams: Team[] = [];

  constructor(private teamService: TeamService, private router: Router) {
  }


  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams() {
    this.teamService.getTeams().subscribe({
      next: data => this.teams = data
    });
  }


  create(){
    this.router.navigate(['coordenador/cadastro-turma']);
  }

  edit(teams: Team) {
    this.router.navigate(['coordenador/atualizar-turma', teams.id]);
  }

  delete(teams: Team) {
    this.teamService.delete(teams).subscribe({
      next: () => this.loadTeams()
    });
  }
}
