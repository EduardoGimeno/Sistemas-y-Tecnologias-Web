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

  constructor(private http: HttpClient) { }

  public getEntries() {
    let entry1: Apartamento = {
      direccion: "",
      capacidad: 0,
      email: "",
      municipio: "Zaragoza",
      nombre: "Apartamento",
      codigoPostal: 0,
      provincia: "Zaragoza",
      comarca: "Aragón",
      telefono: "",
      tipoAlojamiento: "h"
    }
    let entry2: Camping = {
      direccion: "",
      capacidad: 0,
      email: "",
      municipio: "Cariñena",
      nombre: "Camping",
      codigoPostal: 0,
      provincia: "Zaragoza",
      comarca: "Aragón",
      telefono: "",
      tipoAlojamiento: "e"
    }
    let entry3: AlojamientoTurismoRural = {
      direccion: "",
      capacidad: 0,
      email: "",
      municipio: "Teruel",
      nombre: "Turismo rural",
      codigoPostal: 0,
      provincia: "Teruel",
      comarca: "Aragón",
      telefono: "",
      espigas: 5,
      tipo: "tipo",
      tipoAlojamiento: "z"
    }
    let entry4: Hotel = {
      direccion: "",
      capacidad: 0,
      email: "",
      municipio: "Teruel",
      nombre: "Hotel",
      codigoPostal: 0,
      provincia: "Teruel",
      comarca: "Aragón",
      telefono: "",
      estrellas: 4,
      grupo: "tipo",
      tipoAlojamiento: "z"
    }
    let entry5: Refugio = {
      direccion: "",
      capacidad: 0,
      email: "",
      municipio: "Teruel",
      nombre: "Refugio",
      codigoPostal: 0,
      provincia: "Teruel",
      comarca: "Aragón",
      telefono: "",
      tipoAlojamiento: "z"
    }
    entry1 = new Apartamento(entry1);
    entry2 = new Camping(entry2);
    entry3 = new AlojamientoTurismoRural(entry3);
    entry4 = new Hotel(entry4);
    entry5 = new Refugio(entry5);
    return [entry1, entry2, entry3, entry4, entry5];
  }

}
