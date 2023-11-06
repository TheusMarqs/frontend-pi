import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from './schedules';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  url = "http://localhost:8080/schedules";
  constructor(private http: HttpClient) { }

  getSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.url);
  }

  getSchedule(id: number): Observable<Schedule> {
    return this.http.get<Schedule>(`${this.url}/${id}`);
  }

  save(schedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(this.url, schedule);
  }

  update(schedule: Schedule): Observable<Schedule> {
    return this.http.put<Schedule>(`${this.url}/${schedule.id}`, schedule);
  }

  delete(schedule: Schedule): Observable<void> {
    return this.http.delete<void>(`${this.url}/${schedule.id}`);
  }
}
