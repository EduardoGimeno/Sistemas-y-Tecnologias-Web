import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Alojamiento} from "../entities/alojamiento";

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(private http: HttpClient) { }

  public getEntries() {
    let entry1: Alojamiento = {
      direccion: "",
      capacidad: 0,
      email: "",
      grupo: "",
      municipio: "Zaragoza",
      nombre: "Entrada 1",
      codigoPostal: 0,
      provincia: "Zaragoza",
      comarca: "Aragón",
      estrellas: 4,
      telefono: ""
    }
    let entry2: Alojamiento = {
      direccion: "",
      capacidad: 0,
      email: "",
      grupo: "",
      municipio: "Cariñena",
      nombre: "Entrada 2",
      codigoPostal: 0,
      provincia: "Zaragoza",
      comarca: "Aragón",
      estrellas: 5,
      telefono: ""
    }
    let entry3: Alojamiento = {
      direccion: "",
      capacidad: 0,
      email: "",
      grupo: "",
      municipio: "Teruel",
      nombre: "Entrada 3",
      codigoPostal: 0,
      provincia: "Teruel",
      comarca: "Aragón",
      estrellas: 1,
      telefono: ""
    }
    return [entry1, entry2, entry3];
  }

}
