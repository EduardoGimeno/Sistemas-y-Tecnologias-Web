import {Alojamiento} from "./alojamiento";

export class Apartamento extends Alojamiento {
  constructor(a: Apartamento) {
    super(a);
    this.tipoEntry = "Apartamento";
  }
}
