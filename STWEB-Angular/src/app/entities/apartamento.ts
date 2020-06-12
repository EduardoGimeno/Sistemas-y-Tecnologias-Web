import {Alojamiento} from "./alojamiento";

export class Apartamento {
  id: string;
  comun: Alojamiento;
  tipoEntry:string;

    constructor(a) {
      this.id = a.id;
      this.comun = a.comun;
      this.tipoEntry = "Apartamento";
  }
}
