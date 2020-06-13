import { Component, OnInit } from '@angular/core';
import { UserApp } from '../entities/usuario';
import { CurrentUserService } from "../current-user.service";
import { EntryService } from "../services/entry-service.service";
import { Router } from "@angular/router";
import {Apartamento} from "../entities/apartamento";
import {Hotel} from "../entities/hotel";
import {AlojamientoTurismoRural} from "../entities/alojamientoTurismoRural";
import {Camping} from "../entities/camping";
import {Refugio} from "../entities/refugio";
import {Restaurante} from "../entities/restaurante";
import {OficinaTurismo} from "../entities/oficinaTurismo";
import {PuntoInformacion} from "../entities/puntoInformacion";
import {Guia} from "../entities/guia";

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
  numPages = 1;
  numTotal = 0;

  busquedaConFiltros: boolean = false;

  constructor(public currentUser: CurrentUserService, public entryService: EntryService,
              public route: Router) { }

  ngOnInit(): void {
    this.user = this.currentUser.checkLog();
    this.disableSelections(0);
    this.filter(0, false);
  }

  numberReturn(length){
    return new Array(length);
  }

  selection(event) {
    this.selectedIndex = event.target.selectedIndex;
    this.filter(this.selectedIndex, true);
  }

  filter(index, click:boolean) {
    if (click) {
    this.page = 1;
    }
    this.busquedaConFiltros = false;
    this.showEntries = [];
    if (index == 0) {
      this.entryService.getCount("hotels").subscribe(num => {
        this.numTotal = <number>num;
        this.numPages = (this.numTotal / 20);
      });
      this.entryService.getHoteles(this.page - 1).subscribe(data => {
        for (let h of <[]>data) {
          this.showEntries.push(new Hotel(h));
        }
      });
      this.calidadString = "Estrellas";
    } else if (index == 1) {
      this.entryService.getCount("ruralHouses").subscribe(num => {
        this.numTotal = <number>num;
        this.numPages = (this.numTotal / 20);
      });
      this.entryService.getTurismosRurales(this.page - 1).subscribe(data => {
        for (let a of <[]>data) {
          this.showEntries.push(new AlojamientoTurismoRural(a));
        }
      });
      this.calidadString = "Espigas";
    } else if (index == 2) {
      this.entryService.getCount("apartments").subscribe(num => {
        this.numTotal = <number>num;
        this.numPages = (this.numTotal / 20);
        console.log("TOTAL: " + num);
      });
      this.entryService.getApartamentos(this.page - 1).subscribe(data => {
        for (let a of <[]>data) {
          this.showEntries.push(new Apartamento(a));
        }
      });
    } else if (index == 3) {
      this.entryService.getCount("campings").subscribe(num => {
        this.numTotal = <number>num;
        this.numPages = (this.numTotal / 20);
      });
      this.entryService.getCampings(this.page - 1).subscribe(data => {
        for (let c of <[]>data) {
          this.showEntries.push(new Camping(c));
        }
      });
    } else if (index == 4) {
      this.entryService.getCount("shelters").subscribe(num => {
        this.numTotal = <number>num;
        this.numPages = (this.numTotal / 20);
      });
      this.entryService.getRefugios(this.page - 1).subscribe(data => {
        for (let r of <[]>data) {
          this.showEntries.push(new Refugio(r));
        }
      });
    } else if (index == 5) {
      this.entryService.getCount("restaurants").subscribe(num => {
        this.numTotal = <number>num;
        this.numPages = (this.numTotal / 20);
      });
      this.entryService.getRestaurantes(this.page - 1).subscribe(data => {
        for (let r of <[]>data) {
          this.showEntries.push(new Restaurante(r));
        }
      });
      this.calidadString = "Tenedores/Tazas";
    } else if (index == 6) {
      this.entryService.getCount("touristOffices").subscribe(num => {
        this.numTotal = <number>num;
        this.numPages = (this.numTotal / 20);
      });
      this.entryService.getOficinasTurismo(this.page - 1).subscribe(data => {
        for (let o of <[]>data) {
          this.showEntries.push(new OficinaTurismo(o));
        }
      });
    } else if (index == 7) {
      this.entryService.getCount("informationPoints").subscribe(num => {
        this.numTotal = <number>num;
        this.numPages = (this.numTotal / 20);
      });
      this.entryService.getPuntosInformacion(this.page - 1).subscribe(data => {
        for (let p of <[]>data) {
          this.showEntries.push(new PuntoInformacion(p));
        }
      });
    } else if (index == 8) {
      this.entryService.getCount("guides").subscribe(num => {
        this.numTotal = <number>num;
        this.numPages = (this.numTotal / 20);
      });
      this.entryService.getGuias(this.page - 1).subscribe(data => {
        for (let g of <[]>data) {
          this.showEntries.push(new Guia(g));
        }
      });
    } else {
      this.filter(0, true);
    }
    this.disableSelections(index);
  }

  navigateToEntry(entry) {
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

  search(click:boolean) {
    if (click) {
      this.page = 1;
    }
    this.busquedaConFiltros = true;
    this.showEntries = [];
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
        for (let h of <[]>data) {
          this.showEntries.push(new Hotel(h));
        }
      });
    } else if (this.selectedIndex == 1) {
      this.entryService.searchTurismoRurales(provincia, comarca, municipio, estrellasMin,
        estrellasMax, this.page - 1).subscribe(data => {
        for (let a of <[]>data) {
          this.showEntries.push(new AlojamientoTurismoRural(a));
        }
      });
    } else if (this.selectedIndex == 2) {
      this.entryService.searchApartamentos(provincia, comarca, municipio,
        this.page - 1).subscribe(data => {
        for (let a of <[]>data) {
          this.showEntries.push(new Apartamento(a));
        }
      });
    } else if (this.selectedIndex == 3) {
      this.entryService.searchCampings(provincia, comarca, municipio, this.page - 1).subscribe(data => {
        for (let c of <[]>data) {
          this.showEntries.push(new Camping(c));
        }
      });
    } else if (this.selectedIndex == 4) {
      this.entryService.searchRefugios(provincia, comarca, municipio, this.page - 1).subscribe(data => {
        for (let r of <[]>data) {
          this.showEntries.push(new Refugio(r));
        }
      });
    } else if (this.selectedIndex == 5) {
      this.entryService.searchRestaurantes(provincia, comarca, municipio, estrellasMin,
        estrellasMax, this.page - 1).subscribe(data => {
        for (let r of <[]>data) {
          this.showEntries.push(new Restaurante(r));
        }
      });
    } else if (this.selectedIndex == 6) {
      this.entryService.searchOficinasTurismo(provincia, comarca, this.page - 1).subscribe(data => {
        for (let o of <[]>data) {
          this.showEntries.push(new OficinaTurismo(o));
        }
      });
    } else if (this.selectedIndex == 7) {
      this.entryService.searchPuntosInformacion(provincia, comarca, municipio, this.page - 1).subscribe(data => {
        for (let p of <[]>data) {
          this.showEntries.push(new PuntoInformacion(p));
        }
      });
    } else if (this.selectedIndex == 8) {
      this.entryService.searchGuias(idioma, this.page - 1).subscribe(data => {
        for (let g of <[]>data) {
          this.showEntries.push(new Guia(g));
        }
      });
    } else {
      this.selectedIndex = 0;
      this.search(true);
    }

  }


  paginaSiguiente() {
    this.page = this.page + 1;
    if (!this.busquedaConFiltros) {
      this.filter(this.selectedIndex, false);
    } else {
      this.search(false);
    }
  }

  paginaAnterior() {
    this.page = this.page - 1;
    if (!this.busquedaConFiltros) {
      this.filter(this.selectedIndex, false);
    } else {
      this.search(false);
    }
  }

}
