import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Alojamiento } from "../entities/alojamiento";
import { AlojamientoTurismoRural } from "../entities/alojamientoTurismoRural";
import {Apartamento} from "../entities/apartamento";
import {Camping} from "../entities/camping";
import {Refugio} from "../entities/refugio";
import {Hotel} from "../entities/hotel";

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  entry1: Apartamento = new Apartamento({
    id: 'id',
    direccion: "Calle del apartamento",
    capacidad: 0,
    email: "",
    municipio: "Zaragoza",
    nombre: "Apartamento",
    codigoPostal: 0,
    provincia: "Zaragoza",
    comarca: "Aragón",
    telefono: "000 00 00 00",
    tipoAlojamiento: "h"
  });
  entry2: Camping = new Camping({
    id: 'id',
    direccion: "Calle del camping",
    capacidad: 0,
    email: "",
    municipio: "Cariñena",
    nombre: "Camping",
    codigoPostal: 0,
    provincia: "Zaragoza",
    comarca: "Aragón",
    telefono: "000 00 00 00",
    tipoAlojamiento: "e"
  });
  entry3: AlojamientoTurismoRural = new AlojamientoTurismoRural({
    id: 'id',
    direccion: "Calle del turismo rural",
    capacidad: 0,
    email: "",
    municipio: "Teruel",
    nombre: "Turismo rural",
    codigoPostal: 0,
    provincia: "Teruel",
    comarca: "Aragón",
    telefono: "000 00 00 00",
    espigas: 5,
    tipo: "tipo",
    tipoAlojamiento: "z"
  });
  entry4: Hotel = new Hotel({
    id: 'id',
    direccion: "Calle del hotel",
    capacidad: 0,
    email: "",
    municipio: "Teruel",
    nombre: "Hotel",
    codigoPostal: 0,
    provincia: "Teruel",
    comarca: "Aragón",
    telefono: "000 00 00 00",
    estrellas: 4,
    grupo: "tipo",
    tipoAlojamiento: "z"
  });
  entry5: Refugio = new Refugio({
    id: 'id',
    direccion: "Calle del refugio",
    capacidad: 0,
    email: "",
    municipio: "Teruel",
    nombre: "Refugio",
    codigoPostal: 0,
    provincia: "Teruel",
    comarca: "Aragón",
    telefono: "000 00 00 00",
    tipoAlojamiento: "z"
  });

  constructor(private http: HttpClient) { }

  public getEntries() {
    return [this.entry1, this.entry2, this.entry3, this.entry4, this.entry5];
  }

  public getHotel(id) {
    return this.entry4;
  }

  public getTurismoRural(id) {
    return this.entry3;
  }

  public getApartamento(id) {
    return this.entry1;
  }

  public getCamping(id) {
    return this.entry2;
  }

  public getRefugio(id) {
    return this.entry5;
  }

}
