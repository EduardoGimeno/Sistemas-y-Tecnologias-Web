import {Alojamiento} from "./alojamiento";

export class Hotel{
  id: string;
  comun: Alojamiento;
  tipoEntry:string;
  grupo: string;
  estrellas: number;

  constructor(h) {
    this.id = h.id;
    this.comun = h.comun;
    this.grupo = h.grupo;
    this.estrellas = h.estrellas;
    this.tipoEntry = "Hotel";
  }
}
