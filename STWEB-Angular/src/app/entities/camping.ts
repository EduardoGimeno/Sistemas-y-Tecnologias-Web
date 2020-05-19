import {Alojamiento} from "./alojamiento";

export class Camping extends Alojamiento {
  constructor(c: Camping) {
    super(c);
    this.tipoAlojamiento = "Camping";
  }
}
