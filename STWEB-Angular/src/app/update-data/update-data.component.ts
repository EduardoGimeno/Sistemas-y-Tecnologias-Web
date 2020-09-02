import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user-service.service";
import {Router} from "@angular/router";
import {CurrentUserService} from "../current-user.service";
import {EntryService} from "../services/entry-service.service";

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.css']
})
export class UpdateDataComponent implements OnInit {

  hotelsString = "Hoteles: ";
  ruralHousesString = "Turismo rural: ";
  apartmentsString = "Apartamentos: ";
  campingsString = "Hoteles: ";
  sheltersString = "Refugios: ";
  restaurantsString = "Restaurantes: ";
  touristOfficesString = "Oficinas de turismo: ";
  informationPointsString = "Puntos de información: ";
  guidesString = "Guías: ";

  constructor(public currentService: CurrentUserService, public entryService: EntryService) { }

  ngOnInit(): void {
    this.contarEntradas();
    this.currentService.checkLog();
  }

  contarEntradas() {
    this.entryService.getCount("hotels").subscribe(num => {
      this.hotelsString = "Hoteles: " + <string>num;
    });
    this.entryService.getCount("ruralHouses").subscribe(num => {
      this.ruralHousesString = "Turismo rural: " + <string>num;
    });
    this.entryService.getCount("apartments").subscribe(num => {
      this.apartmentsString = "Apartamentos: " + <string>num;
    });
    this.entryService.getCount("campings").subscribe(num => {
      this.campingsString = "Campings: " + <string>num;
    });
    this.entryService.getCount("shelters").subscribe(num => {
      this.sheltersString = "Refugios: " + <string>num;
    });
    this.entryService.getCount("restaurants").subscribe(num => {
      this.restaurantsString = "Restaurantes: " + <string>num;
    });
    this.entryService.getCount("touristOffices").subscribe(num => {
      this.touristOfficesString = "Oficinas de turismo: " + <string>num;
    });
    this.entryService.getCount("informationPoints").subscribe(num => {
      this.informationPointsString = "Puntos de información: " + <string>num;
    });
    this.entryService.getCount("guides").subscribe(num => {
      this.guidesString = "Guías: " + <string>num;
    });
  }

  parserTodos() {
    this.parserHoteles();
    this.parserTurismoRural();
    this.parserApartamentos();
    this.parserCampings();
    this.parserRefugios();
    this.parserRestaurantes();
    this.parserOficinasTurismo();
    this.parserPuntosInformacion();
    this.parserGuias();
  }

  parserHoteles() {
    this.hotelsString = "Actualizando...";
    this.entryService.parser("hotels").subscribe(data => {
      console.log(data);
      this.entryService.getCount("hotels").subscribe(num => {
        this.hotelsString = "Hoteles: " + <string>num;
      });
    });
  }

  parserTurismoRural() {
    this.ruralHousesString = "Actualizando...";
    this.entryService.parser("ruralHouses").subscribe(data => {
      console.log(data);
      this.entryService.getCount("ruralHouses").subscribe(num => {
        this.ruralHousesString = "Turismo rural: " + <string>num;
      });
    });
  }

  parserApartamentos() {
    this.apartmentsString = "Actualizando...";
    this.entryService.parser("apartments").subscribe(data => {
      console.log(data);
      this.entryService.getCount("apartments").subscribe(num => {
        this.apartmentsString = "Apartamentos: " + <string>num;
      });
    });
  }

  parserCampings() {
    this.campingsString = "Actualizando...";
    this.entryService.parser("campings").subscribe(data => {
      console.log(data);
      this.entryService.getCount("campings").subscribe(num => {
        this.campingsString = "Campings: " + <string>num;
      });
    });
  }

  parserRefugios() {
    this.sheltersString = "Actualizando...";
    this.entryService.parser("shelters").subscribe(data => {
      console.log(data);
      this.entryService.getCount("shelters").subscribe(num => {
        this.sheltersString = "Refugios: " + <string>num;
      });
    });
  }

  parserRestaurantes() {
    this.restaurantsString = "Actualizando...";
    this.entryService.parser("restaurants").subscribe(data => {
      console.log(data);
      this.entryService.getCount("restaurants").subscribe(num => {
        this.restaurantsString = "Restaurantes: " + <string>num;
      });
    });
  }

  parserOficinasTurismo() {
    this.touristOfficesString = "Actualizando...";
    this.entryService.parser("touristOffices").subscribe(data => {
      console.log(data);
      this.entryService.getCount("touristOffices").subscribe(num => {
        this.touristOfficesString = "Oficinas de turismo: " + <string>num;
      });
    });
  }

  parserPuntosInformacion() {
    this.informationPointsString = "Actualizando...";
    this.entryService.parser("informationPoints").subscribe(data => {
      console.log(data);
      this.entryService.getCount("informationPoints").subscribe(num => {
        this.informationPointsString = "Puntos de información: " + <string>num;
      });
    });
  }

  parserGuias() {
    this.guidesString = "Actualizando...";
    this.entryService.parser("guides").subscribe(data => {
      console.log(data);
      this.entryService.getCount("guides").subscribe(num => {
        this.guidesString = "Guías: " + <string>num;
      });
    });
  }


}
