import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserApp } from '../entities/usuario';
import { CurrentUserService } from "../current-user.service";
import { ActivatedRoute } from "@angular/router";
import { EntryService } from "../services/entry-service.service";


import { GeocodeService } from './geocode.service';
import { Location } from './location';
import {Hotel} from "../entities/hotel";
import {Apartamento} from "../entities/apartamento";
import {AlojamientoTurismoRural} from "../entities/alojamientoTurismoRural";
import {Refugio} from "../entities/refugio";
import {Camping} from "../entities/camping";
import {Restaurante} from "../entities/restaurante";
import {OficinaTurismo} from "../entities/oficinaTurismo";
import {PuntoInformacion} from "../entities/puntoInformacion";
import {Guia} from "../entities/guia";
import {Conversacion} from "../entities/conversacion";
import {ChatService} from "../services/chat-service.service";
import { AgmCoreModule } from '@agm/core';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {
  //Variables para google maps y geocode

  //DIRECCION A BUSCAR
  address;
  location: Location;
  loading: boolean;

  user: UserApp;
  entry;
  //Conseguir las provincias de paises


  constructor(public currentUser: CurrentUserService, private activatedRoute: ActivatedRoute,
              public entryService: EntryService,  private geocodeService: GeocodeService,
              private ref: ChangeDetectorRef, public chatService: ChatService) {


  }

  showLocation() {
      this.loading = true;
      /*this.geocodeService.geocodeAddress(this.address)
      .subscribe((location: Location) => {
          this.location = location;
          this.loading = false;
          this.ref.detectChanges();
        }
      );*/
  }

  ngOnInit(): void {
    //Geocode stuff
    //this.showLocation();
    this.user = this.currentUser.checkLog();
    this.activatedRoute.queryParams.subscribe(params => {
      let tipoEntry = params['tipo'];
      let id = params['id'];
      if (tipoEntry == 'hot') {
          this.entryService.getHotel(id).subscribe(hotel => {
            this.entry = new Hotel(hotel);
            console.log(this.entry);
            this.address = this.entry.comun.municipio + " " + this.entry.comun.direccion;
            console.log(this.address);
            this.showLocation();
          });
        } else if (tipoEntry == 'apa') {
          this.entryService.getApartamento(id).subscribe(apartamento => {
            this.entry = new Apartamento(apartamento);
            this.address = this.entry.comun.municipio + " " + this.entry.comun.direccion;
            console.log(this.address);
            this.showLocation();
          });
        } else if (tipoEntry == 'tur') {
          this.entryService.getTurismoRural(id).subscribe(alojamientoTurismoRural => {
            this.entry = new AlojamientoTurismoRural(alojamientoTurismoRural);
            this.address = this.entry.comun.municipio + " " + this.entry.comun.direccion;
            this.showLocation();
          });
        } else if (tipoEntry == 'ref') {
          this.entryService.getRefugio(id).subscribe(refugio => {
            this.entry = new Refugio(refugio);
            this.address = this.entry.comun.municipio + " " + this.entry.comun.direccion;
            this.showLocation();
          });
        } else if (tipoEntry == 'cam') {
          this.entryService.getCamping(id).subscribe(camping => {
            this.entry = new Camping(camping);
            this.address = this.entry.comun.municipio + " " + this.entry.comun.direccion;
            this.showLocation();
          });
        } else if (tipoEntry == 'res') {
          this.entryService.getRestaurante(id).subscribe(restaurante => {
            this.entry = new Restaurante(restaurante);
            this.address = this.entry.municipio + " " + this.entry.direccion;
            this.showLocation();
          });
        } else if (tipoEntry == 'ofi') {
          this.entryService.getOficinaTurismo(id).subscribe(oficinaTurismo => {
            this.entry = new OficinaTurismo(oficinaTurismo);
            this.address = this.entry.municipio + " " + this.entry.direccion;
            this.showLocation();
          });
        } else if (tipoEntry == 'pun') {
          this.entryService.getPuntoInformacion(id).subscribe(puntoInformacion => {
            this.entry = new PuntoInformacion(puntoInformacion);
            this.address = this.entry.municipio + " " + this.entry.direccion;
            this.showLocation();
          });
        } else if (tipoEntry == 'gui') {
        this.entryService.getGuia(id).subscribe(guia => {
          this.entry = new Guia(guia);
          this.address = this.entry.municipio + " " + this.entry.direccion;
          this.showLocation();
        });
      }
    });
  }

  numberReturn(length){
    return new Array(length);
  }

  crearChat() {
    this.chatService.addChat(this.entry.comun.nombre, this.user.nombre,this.entry.comun.email,
      this.user.email).subscribe(data => {
      console.log(data);
    });
  }

}
