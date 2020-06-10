import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserApp } from '../entities/usuario';
import { CurrentUserService } from "../current-user.service";
import { ActivatedRoute } from "@angular/router";
import { EntryService } from "../services/entry-service.service";
import { AgmCoreModule } from '@agm/core';

import { GeocodeService } from './geocode.service';
import { Location } from './location';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {
  //Variables para google maps y geocode
  lat = 40.730610;
  lng = -73.935242;
  //DIRECCION A BUSCAR
  address = 'LARDIES CALLE UNICA SN';
  location: Location;
  loading: boolean;

  user: UserApp;
  entry;

  constructor(public currentUser: CurrentUserService, private activatedRoute: ActivatedRoute,
              public entryService: EntryService,  private geocodeService: GeocodeService,
              private ref: ChangeDetectorRef) {
  }

  showLocation() {
      this.addressToCoordinates();
  }

  addressToCoordinates() {
      this.loading = true;
      this.geocodeService.geocodeAddress(this.address)
      .subscribe((location: Location) => {
          this.location = location;
          this.loading = false;
          this.ref.detectChanges();
        }
      );
  }

  ngOnInit(): void {
    //Geocode stuff
    this.showLocation();
    //Final Geocode stuff
    this.user = this.currentUser.checkLog();
    this.activatedRoute.queryParams.subscribe(params => {
      let tipoEntry = params['tipo'];
      let id = params['id'];
      if (tipoEntry == 'hot') {
        this.entry = this.entryService.getHotel(id);
      } else if (tipoEntry == 'apa') {
        this.entry = this.entryService.getApartamento(id);
      } else if (tipoEntry == 'tur') {
        this.entry = this.entryService.getTurismoRural(id);
      } else if (tipoEntry == 'ref') {
        this.entry = this.entryService.getRefugio(id);
      } else if (tipoEntry == 'cam') {
        this.entry = this.entryService.getCamping(id);
      } else if (tipoEntry == 'res') {
        this.entry = this.entryService.getRestaurante(id);
      } else if (tipoEntry == 'ofi') {
        this.entry = this.entryService.getOficinaTurismo(id);
      } else if (tipoEntry == 'pun') {
        this.entry = this.entryService.getPuntoInformacion(id);
      }
    });
    this.address = this.entry.municipio+" "+this.entry.direccion;
  }

  numberReturn(length){
    return new Array(length);
  }

}
