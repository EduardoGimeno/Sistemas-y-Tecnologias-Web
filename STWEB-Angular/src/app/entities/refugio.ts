import {Alojamiento} from "./alojamiento";

export class Refugio {
  id: string;
  comun: Alojamiento;
  tipoEntry:string;

  constructor(r) {
    this.id = r._id;
    this.comun = r.comun;
    this.tipoEntry = "Refugio";
  }
}
