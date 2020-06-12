import {Alojamiento} from "./alojamiento";

export class Camping {
  id: string;
  comun: Alojamiento;
  tipoEntry:string;

  constructor(c) {
    this.id = c._id;
    this.comun = c.comun;
    this.tipoEntry = "Camping";
  }
}
