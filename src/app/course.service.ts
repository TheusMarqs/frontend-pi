import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Course } from './courses';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  url = "http://localhost:8080/courses";
  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    console.log(this.http.get<Course[]>(this.url));
    return this.http.get<Course[]>(this.url);
  }

  getCourse(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.url}/${id}`);
  }

  getCourseName(id: number): Observable<string> {
    return this.http.get<any>(`${this.url}/${id}`).pipe(
      map((response: any) => response.name)
    );
  }

  save(course: Course): Observable<Course> {
    return this.http.post<Course>(this.url, course);
  }

  update(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.url}/${course.id}`, course);
  }

  delete(course: Course): Observable<void> {
    return this.http.delete<void>(`${this.url}/${course.id}`);
  }
}
