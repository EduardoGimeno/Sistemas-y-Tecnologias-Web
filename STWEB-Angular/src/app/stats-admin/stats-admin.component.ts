import { Component, OnInit } from '@angular/core';
import { UserApp } from '../entities/usuario';
import { CurrentUserService } from "../current-user.service";
import { EntryService } from "../services/entry-service.service";

@Component({
  selector: 'app-stats-admin',
  templateUrl: './stats-admin.component.html',
  styleUrls: ['./stats-admin.component.css']
})
export class StatsAdminComponent implements OnInit {

  pageName = "Estadísticas";

 //Diagrama5
              chartOptions5 = {
                responsive: true,
                title: {
                  text: 'Provincias de procedencia de los usuarios',
                  display: true,
                  fontSize: 45
                }
              };
              chartLabels5 = [];
              barChartColors5 = [
               { backgroundColor: 'orange' },
              ]
              chartData5 = [
               { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
              ];

       //Diagrama6
                  chartOptions6 = {
                    responsive: true,
                    title: {
                                     text: 'Distribución de las entradas por porcentajes',
                                     display: true,
                                     fontSize: 45
                                   }
                  };
                  chartLabels6 = [];
                  barChartColors6 = [{
                   backgroundColor: ['red', '#0F0', 'orange', 'black', 'brown', 'blue', 'pink', 'green', 'purple'],
                  }];
                  chartData6 = [];
       //Diagrama7
                      chartOptions7 = {
                        responsive: true,
                        title: {
                                         text: 'Cantidad de chats por hotel',
                                         display: true,
                                         fontSize: 45
                                       }
                      };
                      chartLabels7 = [];
                      barChartColors7 = [
                                  { backgroundColor: 'purple' },
                                 ]
                      chartData7 = [];

       //Diagrama8
                          chartOptions8 = {
                            responsive: true,
                            title: {
                                             text: 'Fechas de recuperación de las cuentas',
                                             display: true,
                                             fontSize: 45
                                           }
                          };
                          chartLabels8 = [];
                          barChartColors8 = [
                                      { backgroundColor: 'green' },
                                     ]
                          chartData8 = [];
  user: UserApp;

  constructor(public currentUser: CurrentUserService, public entryService: EntryService) { }

  ngOnInit(): void {
    this.user = this.currentUser.checkLog();
    this.getProvinciasProcedencia();
    this.getEntradasAplicacion();
    this.getChatsPerHotel();
    this.getFechasRecuperacion();
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

}
