import { Component, OnInit } from '@angular/core';
import { UserApp } from '../entities/usuario';
import { CurrentUserService } from "../current-user.service";
//import { ChartsModule } from '@rinminase/ng-charts';

@Component({
  selector: 'app-stats-user',
  templateUrl: './stats-user.component.html',
  styleUrls: ['./stats-user.component.css']
})
export class StatsUserComponent implements OnInit {
  //Diagrama
  chartOptions = {
      responsive: true,
    };
    chartLabels = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

    chartData = [
      { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
    ];

  user: UserApp;

  constructor(public currentUser: CurrentUserService) { }

  ngOnInit(): void {
    this.user = this.currentUser.checkLog();
  }

}
