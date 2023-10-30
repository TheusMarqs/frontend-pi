import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Discipline } from './Disciplines';

@Injectable({
  providedIn: 'root'
})
export class DisciplineService {
  url = "http://localhost:8080/disciplines";
  constructor(private http: HttpClient) { }

  getDisciplines(): Observable<Discipline[]> {
    console.log(this.http.get<Discipline[]>(this.url));
    return this.http.get<Discipline[]>(this.url);
  }

  getDiscipline(id: number): Observable<Discipline> {
    return this.http.get<Discipline>(`${this.url}/${id}`);
  }

  save(discipline: Discipline): Observable<Discipline> {
    return this.http.post<Discipline>(this.url, discipline);
  }

  update(discipline: Discipline): Observable<Discipline> {
    return this.http.put<Discipline>(`${this.url}/${discipline.id}`, discipline);
  }

  delete(discipline: Discipline): Observable<void> {
    return this.http.delete<void>(`${this.url}/${discipline.id}`);
  }
}
