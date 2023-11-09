import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TimeService } from 'src/app/time.service';
import { Time } from 'src/app/times';

@Component({
  selector: 'app-show-time',
  templateUrl: './show-time.component.html',
  styleUrls: ['./show-time.component.css', '../../app.component.css']
})
export class ShowTimeComponent {
  times: Time[] = [];
  filter: string = '';

  constructor(private timeService: TimeService, private router: Router) {
  }


  ngOnInit(): void {
    this.loadTimes();
  }
  
  loadTimes() {
    this.timeService.getTimes().subscribe({
      next: data => this.times = data
    });
  }


  create(){
    this.router.navigate(['coordenador/cadastro-horario']);
  }

  edit(times: Time) {
    this.router.navigate(['coordenador/atualizar-horario', times.id]);
  }

  delete(times: Time) {
    this.timeService.delete(times).subscribe({
      next: () => this.loadTimes()
    });
  }
}
