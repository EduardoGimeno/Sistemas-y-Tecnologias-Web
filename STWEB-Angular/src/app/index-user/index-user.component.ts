import { Component, OnInit } from '@angular/core';
import { UserApp } from '../entities/usuario';
import { CurrentUserService } from "../current-user.service";
import { EntryService } from "../services/entry-service.service";
import { Router } from "@angular/router";
import {Apartamento} from "../entities/apartamento";

@Component({
  selector: 'app-index-user',
  templateUrl: './index-user.component.html',
  styleUrls: ['./index-user.component.css']
})
export class IndexUserComponent implements OnInit {

  user: UserApp;

  showEntries = [];
  selectedIndex = 0;
  calidadString: string = "Estrellas";

  page = 1;
  numPages = 10;
  numTotal = 0;

  busquedaConFiltros: boolean = false;

  constructor(public currentUser: CurrentUserService, public entryService: EntryService,
              public route: Router) { }

  ngOnInit(): void {
    this.user = this.currentUser.checkLog();
    this.disableSelections(0);
    this.filter(0);
  }

  numberReturn(length){
    return new Array(length);
  }

  selection(event) {
    this.selectedIndex = event.target.selectedIndex;
    this.filter(this.selectedIndex);
  }

  filter(index) {
    this.busquedaConFiltros = false;
    this.showEntries = [];
    if (index == 0) {
      this.entryService.getCount("hotels").subscribe(num => {
        this.numTotal = <number>num;
      });
      this.entryService.getHoteles(this.page - 1).subscribe(data => {
        this.showEntries = <[]>data;
      });
      this.calidadString = "Estrellas";
    } else if (index == 1) {
      this.entryService.getCount("ruralHouses").subscribe(num => {
        this.numTotal = <number>num;
      });
      this.entryService.getTurismosRurales(this.page - 1).subscribe(data => {
        this.showEntries = <[]>data;
      });
      this.calidadString = "Espigas";
    } else if (index == 2) {
      this.entryService.getCount("apartments").subscribe(num => {
        this.numTotal = <number>num;
        console.log("TOTAL: " + num);
      });
      this.entryService.getApartamentos(this.page - 1).subscribe(data => {
        for (let a of <[]>data) {
          this.showEntries.push(new Apartamento(a));
        }
        //this.showEntries = <Apartamento[]>data;
        console.log(data);
        console.log(this.showEntries);
      });
    } else if (index == 3) {
      this.entryService.getCount("campings").subscribe(num => {
        this.numTotal = <number>num;
      });
      this.entryService.getCampings(this.page - 1).subscribe(data => {
        this.showEntries = <[]>data;
      });
    } else if (index == 4) {
      this.entryService.getCount("shelters").subscribe(num => {
        this.numTotal = <number>num;
      });
      this.entryService.getRefugios(this.page - 1).subscribe(data => {
        this.showEntries = <[]>data;
      });
    } else if (index == 5) {
      this.entryService.getCount("restaurants").subscribe(num => {
        this.numTotal = <number>num;
      });
      this.entryService.getRestaurantes(this.page - 1).subscribe(data => {
        this.showEntries = <[]>data;
      });
      this.calidadString = "Tenedores/Tazas";
    } else if (index == 6) {
      this.entryService.getCount("touristOffices").subscribe(num => {
        this.numTotal = <number>num;
      });
      this.entryService.getOficinasTurismo(this.page - 1).subscribe(data => {
        this.showEntries = <[]>data;
      });
    } else if (index == 7) {
      this.entryService.getCount("informationPoints").subscribe(num => {
        this.numTotal = <number>num;
      });
      this.entryService.getPuntosInformacion(this.page - 1).subscribe(data => {
        this.showEntries = <[]>data;
      });
    } else if (index == 8) {
      this.entryService.getCount("guides").subscribe(num => {
        this.numTotal = <number>num;
      });
      this.entryService.getGuias(this.page - 1).subscribe(data => {
        this.showEntries = <[]>data;
      });
    } else {
      this.filter(0);
    }
    this.disableSelections(index);
    this.numPages = (this.numTotal / 20);
  }

  navigateToEntry(entry) {
    console.log("FUNCIONAAAA");
    this.route.navigateByUrl('/entry?tipo=' + entry.tipoEntry.toLowerCase().substr(0,3) +
      '&id=' + entry.id);
  }

  disableSelections(index: number) {

    // Estrellas / Espigas para hoteles y turismo rural y Tenedores / Tazas para restaurantes
    if (index == 0 || index == 1 || index == 5) {
      $('#selectionEstrellasMin').prop('disabled', false);
      $('#selectionEstrellasMax').prop('disabled', false);
    } else {
      $('#selectionEstrellasMin').prop('disabled', true);
      $('#selectionEstrellasMax').prop('disabled', true);
    }

    // Municipio para todos menos para oficina de turismo
    if (index == 6) {
      $('#selectionMunicipio').prop('disabled', true);
    } else {
      $('#selectionMunicipio').prop('disabled', false);
    }

    // Solo idioma para guias
    if (index == 8) {
      $('#selectionProvincia').prop('disabled', true);
      $('#selectionMunicipio').prop('disabled', true);
      $('#selectionComarca').prop('disabled', true);
      $('#selectionEstrellasMax').prop('disabled', true);
      $('#selectionEstrellasMin').prop('disabled', true);
      $('#selectionIdioma').prop('disabled', false);
    } else {
      $('#selectionProvincia').prop('disabled', false);
      $('#selectionComarca').prop('disabled', false);
      $('#selectionIdioma').prop('disabled', true);
    }

  }

  search() {
    this.busquedaConFiltros = true;

    let provincia = <string>$('#selectionProvincia').val();
    let municipio = <string>$('#selectionMunicipio').val();
    let comarca = <string>$('#selectionComarca').val();
    let estrellasMinString = <string>$('#selectionEstrellasMin').val();
    let estrellasMin: number = +estrellasMinString.split(" ")[0];
    let estrellasMaxString = <string>$('#selectionEstrellasMax').val();
    let estrellasMax = +estrellasMaxString.split(" ")[0];
    let idioma = <string>$('#selectionIdioma').val();

    if (this.selectedIndex == 0) {
      this.entryService.searchHoteles(provincia, comarca, municipio, estrellasMin,
        estrellasMax, this.page - 1).subscribe(data => {
        this.showEntries = <[]>data;
      });
    } else if (this.selectedIndex == 1) {
      this.entryService.searchTurismoRurales(provincia, comarca, municipio, estrellasMin,
        estrellasMax, this.page - 1).subscribe(data => {
        this.showEntries = <[]>data;
      });
    } else if (this.selectedIndex == 2) {
      this.entryService.searchApartamentos(provincia, comarca, municipio,
        this.page - 1).subscribe(data => {
        this.showEntries = <[]>data;
      });
    } else if (this.selectedIndex == 3) {
      this.entryService.searchCampings(provincia, comarca, municipio, this.page - 1).subscribe(data => {
        this.showEntries = <[]>data;
      });
    } else if (this.selectedIndex == 4) {
      this.entryService.searchRefugios(provincia, comarca, municipio, this.page - 1).subscribe(data => {
        this.showEntries = <[]>data;
      });
    } else if (this.selectedIndex == 5) {
      this.entryService.searchRestaurantes(provincia, comarca, municipio, estrellasMin,
        estrellasMax, this.page - 1).subscribe(data => {
        this.showEntries = <[]>data;
      });
    } else if (this.selectedIndex == 6) {
      this.entryService.searchOficinasTurismo(provincia, comarca, this.page - 1).subscribe(data => {
        this.showEntries = <[]>data;
      });
    } else if (this.selectedIndex == 7) {
      this.entryService.searchPuntosInformacion(provincia, comarca, municipio, this.page - 1).subscribe(data => {
        this.showEntries = <[]>data;
      });
    } else if (this.selectedIndex == 8) {
      this.entryService.searchGuias(idioma, this.page - 1).subscribe(data => {
        this.showEntries = <[]>data;
      });
    } else {
      this.selectedIndex = 0;
      this.search();
    }

  }


  paginaSiguiente() {
    this.page = this.page + 1;
    if (!this.busquedaConFiltros) {
      this.filter(this.selectedIndex);
    } else {
      this.search();
    }
  }

  paginaAnterior() {
    this.page = this.page - 1;
    if (!this.busquedaConFiltros) {
      this.filter(this.selectedIndex);
    } else {
      this.search();
    }
  }

}
