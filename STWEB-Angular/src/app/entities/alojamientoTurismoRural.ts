import {Alojamiento} from "./alojamiento";

export class AlojamientoTurismoRural {
  id: string;
  comun: Alojamiento;
  espigas: number;
  tipo: String;
  tipoEntry:string;

  constructor(a) {
    this.id = a._id;
    this.comun = a.comun;
    this.espigas = a.espigas;
    this.tipo = a.tipo;
    this.tipoEntry = "Turismo rural";
  }
}
