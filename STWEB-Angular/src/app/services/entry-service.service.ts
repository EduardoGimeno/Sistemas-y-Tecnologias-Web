import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Alojamiento } from "../entities/alojamiento";
import { AlojamientoTurismoRural } from "../entities/alojamientoTurismoRural";
import {Apartamento} from "../entities/apartamento";
import {Camping} from "../entities/camping";
import {Refugio} from "../entities/refugio";
import {Hotel} from "../entities/hotel";
import {Restaurante} from "../entities/restaurante";
import {OficinaTurismo} from "../entities/oficinaTurismo";
import {PuntoInformacion} from "../entities/puntoInformacion";

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private urlApp: string = "https://back-turismoaragon.herokuapp.com";

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
    tipoEntry: "h"
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
    tipoEntry: "e"
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
    tipoEntry: "z"
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
    tipoEntry: "z"
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
    tipoEntry: "z"
  });
  entry6: Restaurante = new Restaurante("id", "Nombre", "Direccion", "Provincia",
    "Municipio", 50003, "Zaragoza", 500, "000 00 00 00", 5);
  entry7: OficinaTurismo = new OficinaTurismo("id", "Nombre", "Direccion", "Provincia",
    "000 00 00 00", "07:00 - 20:00");
  entry8: PuntoInformacion = new PuntoInformacion("id", "Nombre", "Direccion", "Provincia",
    "Municipio");

  constructor(private http: HttpClient) { }

  public getEntries(tipo: string, page: string) {
    let params = new HttpParams()
      .set("page", page);
    return this.http.get(this.urlApp + "/" + tipo + "/", )
    return [this.entry1, this.entry2, this.entry3, this.entry4, this.entry5];
  }

  public getRestaurantes() {
    return [this.entry6];
  }

  public getOficinasTurismo() {
    return [this.entry7];
  }

  public getPuntosInformacion() {
    return [this.entry8];
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

  public getRestaurante(id) {
    return this.entry6;
  }

  public getOficinaTurismo(id) {
    return this.entry7;
  }

  public getPuntoInformacion(id) {
    return this.entry8;
  }

}
