import { Component, OnInit } from '@angular/core';
import { UserApp } from '../entities/usuario';
import { Alojamiento } from '../entities/alojamiento';
import { CurrentUserService } from "../current-user.service";
import { EntryService } from "../services/entry-service.service";
import { Router } from "@angular/router";
import { Restaurante } from "../entities/restaurante";
import {OficinaTurismo} from "../entities/oficinaTurismo";
import { PuntoInformacion } from "../entities/puntoInformacion";

@Component({
  selector: 'app-index-user',
  templateUrl: './index-user.component.html',
  styleUrls: ['./index-user.component.css']
})
export class IndexUserComponent implements OnInit {

  user: UserApp;

  entriesAlojamiento;

  entriesRestaurante: Restaurante[];

  entriesOficinas: OficinaTurismo[];

  entriesPuntos: PuntoInformacion[];

  showEntries = [];

  selectedIndex = 0;

  calidadString: string = "Estrellas";

  constructor(public currentUser: CurrentUserService, public entryService: EntryService,
              public route: Router) { }

  ngOnInit(): void {
    this.user = this.currentUser.checkLog();
    this.entriesAlojamiento = this.entryService.getEntries();
    this.entriesRestaurante = this.entryService.getRestaurantes();
    this.entriesOficinas = this.entryService.getOficinasTurismo();
    this.entriesPuntos = this.entryService.getPuntosInformacion();
    this.showEntries = this.entriesAlojamiento;
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
    this.showEntries = [];
    this.entryService
    if (index == 0) {
      for (let entry of this.entriesAlojamiento) {
        if (entry.tipoEntry == 'Hotel') {
          this.calidadString = "Estrellas";
          this.showEntries.push(entry);
        }
      }
    } else if (index == 1) {
      for (let entry of this.entriesAlojamiento) {
        if (entry.tipoEntry == 'Turismo rural') {
          this.calidadString = "Espigas";
          this.showEntries.push(entry);
        }
      }
    } else if (index == 2) {
      for (let entry of this.entriesAlojamiento) {
        if (entry.tipoEntry == 'Apartamento') {
          this.showEntries.push(entry);
        }
      }
    } else if (index == 3) {
      for (let entry of this.entriesAlojamiento) {
        if (entry.tipoEntry == 'Camping') {
          this.showEntries.push(entry);
        }
      }
    } else if (index == 4) {
      for (let entry of this.entriesAlojamiento) {
        if (entry.tipoEntry == 'Refugio') {
          this.showEntries.push(entry);
        }
      }
    } else if (index == 5) {
      this.calidadString = "Tenedores/Tazas";
      this.showEntries = this.entriesRestaurante;
    } else if (index == 6) {
      this.showEntries = this.entriesOficinas;
    } else if (index == 7) {
      this.showEntries = this.entriesPuntos;
    } else {
      this.showEntries = this.entriesAlojamiento;
    }
    this.disableSelections(index);
  }

  navigateToEntry(entry) {
    this.route.navigateByUrl('/entry?tipo=' + entry.tipoEntry.toLowerCase().substr(0,3) +
      '&id=' + entry.id);
  }

  disableSelections(index: number) {

    // Estrellas / Espigas para hoteles y turismo rural
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
  }

  search() {

    // HACER LLAMADAS

   /* this.filter(this.selectedIndex);

    let provincia = $('#selectionProvincia').val();
    if (provincia != "") {
      let entriesAux = this.showEntries;
      this.showEntries = [];
      for (let e of entriesAux) {
        if (e.provincia == provincia) {
          this.showEntries.push(e);
        }
      }
    }

    let comarca = $('#selectionComarca').val();
    if (comarca != "") {
      let entriesAux = this.showEntries;
      this.showEntries = [];
      for (let e of entriesAux) {
        if (e.comarca == comarca) {
          this.showEntries.push(e);
        }
      }
    }

    let municipio = $('#selectionMunicipio').val();
    if (municipio != "") {
      let entriesAux = this.showEntries;
      this.showEntries = [];
      for (let e of entriesAux) {
        if (e.municipio == municipio) {
          this.showEntries.push(e);
        }
      }
    }

    if (!$('#selectionEstrellasMin').is(':disabled') &&
        !$('#selectionEstrellasMax').is(':disabled')) {
      let min = +$('#selectionEstrellasMin').val();
      let max = +$('#selectionEstrellasMax').val();
      if (this.selectedIndex == 0) {
        let entriesAux = this.showEntries;
        this.showEntries = [];
        for (let e of entriesAux) {
          if (e.espigas >= min && e.espigas <= max) {
            this.showEntries.push(e);
          }
        }
      } else if (this.selectedIndex == 1) {
        let entriesAux = this.showEntries;
        this.showEntries = [];
        for (let e of entriesAux) {
          if (e.estrellas >= min && e.estrellas <= max) {
            this.showEntries.push(e);
          }
        }
      } else if (this.selectedIndex == 5) {
        let entriesAux = this.showEntries;
        this.showEntries = [];
        for (let e of entriesAux) {
          if (e.estrellas >= min && e.estrellas <= max) {
            this.showEntries.push(e);
          }
        }
      }
    }*/

  }


}
