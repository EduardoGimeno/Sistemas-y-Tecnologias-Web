import {Alojamiento} from "./alojamiento";

export class Hotel extends Alojamiento {
  grupo: string;
  estrellas: number;
  constructor(h: Hotel) {
    super(h);
    this.grupo = h.grupo;
    this.estrellas = h.estrellas;
    this.tipoAlojamiento = "Hotel";
  }
}
