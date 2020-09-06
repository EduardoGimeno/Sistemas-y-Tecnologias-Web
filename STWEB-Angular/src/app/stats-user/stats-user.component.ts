import { Component, OnInit } from '@angular/core';
import { UserApp } from '../entities/usuario';
import {Dato} from "../entities/dato";
import { CurrentUserService } from "../current-user.service";
import { EntryService } from "../services/entry-service.service";

@Component({
  selector: 'app-stats-user',
  templateUrl: './stats-user.component.html',
  styleUrls: ['./stats-user.component.css']
})
export class StatsUserComponent implements OnInit {
  //Diagrama de tarta
  chartOptions = {
      responsive: true,
    };
    chartLabels = ['Hoteles', 'Turismo rural', 'Apartamentos', 'Campings', 'Refugios', 'Restaurantes', 'Oficinas de turismo', 'Puntos de información', 'Guías'];
    chartData = [];
    chartColors = [{
      backgroundColor: ['red', '#0F0', 'rgba(41, 182, 246,0.75)', 'black', 'brown', 'blue', 'pink', 'yellow', 'orange'],
    }];
    chartLegend = true;

    //Diagrama2
      datosHoteles = [];
      chartOptions2 = {
          responsive: true,
      };
      chartLabels2 = [];
      barChartColors2 = [
          { backgroundColor: 'blue' },
      ]
      chartData2 = [];

    //Diagrama3
       chartOptions3 = {
         responsive: true,
       };
       chartLabels3 = [];
       barChartColors3 = [
                 { backgroundColor: 'yellow' },
             ]
       chartData3 = [];
    //Diagrama4
       chartOptions4 = {
         responsive: true,
       };
       chartLabels4 = [];
       barChartColors4 = [
                        { backgroundColor: 'red' },
                    ]
       chartData4 = [];
    //Diagrama5
           chartOptions5 = {
             responsive: true,
           };
           chartLabels5 = [];
           barChartColors5 = [
            { backgroundColor: 'orange' },
           ]
           chartData5 = [];
    //Diagrama6
               chartOptions6 = {
                 responsive: true,
               };
               chartLabels6 = [];
               barChartColors6 = [{
                backgroundColor: ['red', '#0F0', 'orange', 'black', 'brown', 'blue', 'pink', 'green', 'purple'],
               }];
               chartData6 = [];
    //Diagrama7
                   chartOptions7 = {
                     responsive: true,
                   };
                   chartLabels7 = [];
                   barChartColors7 = [
                               { backgroundColor: 'purple' },
                              ]
                   chartData7 = [];

    //Diagrama8
                       chartOptions8 = {
                         responsive: true,
                       };
                       chartLabels8 = [];
                       barChartColors8 = [
                                   { backgroundColor: 'green' },
                                  ]
                       chartData8 = [];


  user: UserApp;

  constructor(public currentUser: CurrentUserService,  public entryService: EntryService) { }

  ngOnInit(): void {
    this.user = this.currentUser.checkLog();
    this.getNumbersOfEachData();
    this.getHotelesPorMunicipio();
    this.getIdiomasGuias();
    this.getRestaurantes3Tenedores();
    this.getProvinciasProcedencia();
    this.getEntradasAplicacion();
    this.getChatsPerHotel();
    this.getFechasRecuperacion();
  }

  getHotelesPorMunicipio(){
    this.entryService.getHotelesMunicipio().subscribe(dataArr => {
        for (let d of Object.entries(dataArr)) {
           if(d[0]==="datos"){
               let i: number = 0;
               while(i<d[1].length){
                     this.chartLabels2.push(d[1][i].nombre);
                     this.chartData2.push(d[1][i].valor);
                     i++;
               }
           }
        }
    });
  }

  getIdiomasGuias(){
      this.entryService.getIdiomas().subscribe(dataArr => {
          for (let d of Object.entries(dataArr)) {
            if(d[0]==="datos"){
               let i: number = 0;
               while(i<d[1].length){
                 this.chartLabels3.push(d[1][i].nombre);
                 this.chartData3.push(d[1][i].valor);
                 i++;
               }
            }
          }
      });
  }

  getRestaurantes3Tenedores(){
        this.entryService.getRestaurantesPorComarca().subscribe(dataArr => {
            for (let d of Object.entries(dataArr)) {
              if(d[0]==="datos"){
                 let i: number = 0;
                 while(i<d[1].length){
                   this.chartLabels4.push(d[1][i].nombre);
                   this.chartData4.push(d[1][i].valor);
                   i++;
                 }
              }
            }
        });
  }

  getProvinciasProcedencia(){
          this.entryService.getDistribucionProvincias().subscribe(dataArr => {
              for (let d of Object.entries(dataArr)) {
                if(d[0]==="datos"){
                   let i: number = 0;
                   while(i<d[1].length){
                     this.chartLabels5.push(d[1][i].nombre);
                     this.chartData5.push(d[1][i].valor);
                     i++;
                   }
                }
              }
          });
  }

  getEntradasAplicacion(){
            this.entryService.getEntradasApp().subscribe(dataArr => {
                for (let d of Object.entries(dataArr)) {
                  if(d[0]==="datos"){
                     let i: number = 0;
                     while(i<d[1].length){
                       this.chartLabels6.push(d[1][i].nombre);
                       this.chartData6.push(d[1][i].valor);
                       i++;
                     }
                  }
                }
            });
  }

  getChatsPerHotel(){
              this.entryService.getChatsHotels().subscribe(dataArr => {
                  for (let d of Object.entries(dataArr)) {
                    if(d[0]==="datos"){
                       let i: number = 0;
                       while(i<d[1].length){
                         this.chartLabels7.push(d[1][i].nombre);
                         this.chartData7.push(d[1][i].valor);
                         i++;
                       }
                    }
                  }
              });
  }

  //Actualmente sale vacío porque no hay datos de esta estadística
  getFechasRecuperacion(){
                this.entryService.getFechas().subscribe(dataArr => {
                    for (let d of Object.entries(dataArr)) {
                      if(d[0]==="datos"){
                         let i: number = 0;
                         while(i<d[1].length){
                           this.chartLabels8.push(d[1][i].nombre);
                           this.chartData8.push(d[1][i].valor);
                           i++;
                         }
                      }
                    }
                });
    }



  getNumbersOfEachData() {
    this.entryService.getCount("hotels").subscribe(num => {
            this.chartData[0] = <number>num;
          });
    this.entryService.getCount("ruralHouses").subscribe(num => {
            this.chartData[1] = <number>num;
          });
    this.entryService.getCount("apartments").subscribe(num => {
            this.chartData[2] = <number>num;
          });
    this.entryService.getCount("campings").subscribe(num => {
            this.chartData[3] = <number>num;
          });
    this.entryService.getCount("shelters").subscribe(num => {
            this.chartData[4] = <number>num;
          });
    this.entryService.getCount("restaurants").subscribe(num => {
            this.chartData[5] = <number>num;
          });
    this.entryService.getCount("touristOffices").subscribe(num => {
            this.chartData[6] = <number>num;
          });
    this.entryService.getCount("informationPoints").subscribe(num => {
            this.chartData[7] = <number>num;
          });
    this.entryService.getCount("guides").subscribe(num => {
            this.chartData[8] = <number>num;
          });
  }

}
