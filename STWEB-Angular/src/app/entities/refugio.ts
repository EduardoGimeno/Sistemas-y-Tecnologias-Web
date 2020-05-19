import {Alojamiento} from "./alojamiento";

export class Refugio extends Alojamiento {
  constructor(r: Refugio) {
    super(r);
    this.tipoAlojamiento = "Refugio";
  }
}
