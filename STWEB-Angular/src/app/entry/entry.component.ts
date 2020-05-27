import { Component, OnInit } from '@angular/core';
import { UserApp } from '../entities/usuario';
import { CurrentUserService } from "../current-user.service";
import { ActivatedRoute } from "@angular/router";
import { EntryService } from "../services/entry-service.service";

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  user: UserApp;
  entry;

  constructor(public currentUser: CurrentUserService, private activatedRoute: ActivatedRoute,
              public entryService: EntryService) {
  }

  ngOnInit(): void {
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
  }

  numberReturn(length){
    return new Array(length);
  }

}
