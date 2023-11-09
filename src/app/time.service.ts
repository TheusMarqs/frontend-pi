import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Time } from './times';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  url = "http://localhost:8080/times";
  constructor(private http: HttpClient) { }

  getTimes(): Observable<Time[]> {
    return this.http.get<Time[]>(this.url);
  }

  getTime(id: number): Observable<Time> {
    return this.http.get<Time>(`${this.url}/${id}`);
  }

  save(time: Time): Observable<Time> {
    return this.http.post<Time>(this.url, time);
  }

  update(time: Time): Observable<Time> {
    return this.http.put<Time>(`${this.url}/${time.id}`, time);
  }

  delete(time: Time): Observable<void> {
    return this.http.delete<void>(`${this.url}/${time.id}`);
  }
}
