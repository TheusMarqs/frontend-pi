import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Classroom } from './classrooms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  url = "http://localhost:8080/classrooms";
  constructor(private http: HttpClient) { }

  getClassrooms(): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(this.url);
  }

  getClassroom(id: number): Observable<Classroom> {
    return this.http.get<Classroom>(`${this.url}/${id}`);
  }

  save(classroom: Classroom): Observable<Classroom> {
    return this.http.post<Classroom>(this.url, classroom);
  }

  update(classroom: Classroom): Observable<Classroom> {
    return this.http.put<Classroom>(`${this.url}/${classroom.id}`, classroom);
  }

  delete(classroom: Classroom): Observable<void> {
    return this.http.delete<void>(`${this.url}/${classroom.id}`);
  }
}
