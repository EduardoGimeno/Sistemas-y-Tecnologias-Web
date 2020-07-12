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
    chartLabels = ['Hoteles', 'Turismo rural', 'Apartamentos'];
    chartData = [300, 500, 100];
    chartColors = [{
      backgroundColor: ['red', '#0F0', 'rgba(41, 182, 246,0.75)'],
      borderColor: ['rgb(250,120,100)', 'green', '#0086c3']
    }];
    chartLegend = true;
    chartPlugins = [];

  user: UserApp;

  constructor(public currentUser: CurrentUserService) { }

  ngOnInit(): void {
    this.user = this.currentUser.checkLog();
  }

}
