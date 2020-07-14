import { Component, OnInit } from '@angular/core';
import { UserApp } from '../entities/usuario';
import { CurrentUserService } from "../current-user.service";
import { EntryService } from "../services/entry-service.service";
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
    chartLabels = ['Hoteles', 'Turismo rural', 'Apartamentos', 'Campings', 'Refugios', 'Restaurantes', 'Oficinas de turismo', 'Puntos de información', 'Guías'];
    chartData = [];
    chartColors = [{
      backgroundColor: ['red', '#0F0', 'rgba(41, 182, 246,0.75)', 'black', 'brown', 'blue', 'pink', 'yellow', 'orange'],
    }];
    chartLegend = true;
    chartPlugins = [];

  user: UserApp;

  constructor(public currentUser: CurrentUserService,  public entryService: EntryService) { }

  ngOnInit(): void {
    this.user = this.currentUser.checkLog();
    this.getNumbersOfData();
  }

  getNumbersOfData() {
    this.entryService.getCount("hotels").subscribe(num => {
            this.chartData.push(<number>num);
          });
    this.entryService.getCount("ruralHouses").subscribe(num => {
            this.chartData.push(<number>num);
          });
    this.entryService.getCount("apartments").subscribe(num => {
            this.chartData.push(<number>num);
          });
    this.entryService.getCount("campings").subscribe(num => {
            this.chartData.push(<number>num);
          });
    this.entryService.getCount("shelters").subscribe(num => {
            this.chartData.push(<number>num);
          });
    this.entryService.getCount("restaurants").subscribe(num => {
            this.chartData.push(<number>num);
          });
    this.entryService.getCount("touristOffices").subscribe(num => {
            this.chartData.push(<number>num);
          });
    this.entryService.getCount("informationPoints").subscribe(num => {
            this.chartData.push(<number>num);
          });
    this.entryService.getCount("guides").subscribe(num => {
            this.chartData.push(<number>num);
          });
  }

}
