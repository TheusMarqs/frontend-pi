import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from './teams';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  url = "http://localhost:8080/teams";
  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.url);
  }

  getTeam(id: number): Observable<Team> {
    return this.http.get<Team>(`${this.url}/${id}`);
  }

  save(team: Team): Observable<Team> {
    return this.http.post<Team>(this.url, team);
  }

  update(team: Team): Observable<Team> {
    return this.http.put<Team>(`${this.url}/${team.id}`, team);
  }

  delete(team: Team): Observable<void> {
    return this.http.delete<void>(`${this.url}/${team.id}`);
  }
}
