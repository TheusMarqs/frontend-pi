import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Professor } from './professors';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  url = "http://localhost:8080/professors";
  constructor(private http: HttpClient) { }

  getProfessors(): Observable<Professor[]> {
    return this.http.get<Professor[]>(this.url);
  }

  getProfessor(id: number): Observable<Professor> {
    return this.http.get<Professor>(`${this.url}/${id}`);
  }

  save(professor: Professor): Observable<Professor> {
    return this.http.post<Professor>(this.url, professor);
  }

  update(professor: Professor): Observable<Professor> {
    return this.http.put<Professor>(`${this.url}/${professor.id}`, professor);
  }

  delete(professor: Professor): Observable<void> {
    return this.http.delete<void>(`${this.url}/${professor.id}`);
  }
}
