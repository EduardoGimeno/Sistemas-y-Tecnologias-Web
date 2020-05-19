import {Alojamiento} from "./alojamiento";

export class AlojamientoTurismoRural extends Alojamiento {
  espigas: number;
  tipo: String;

  constructor(a: AlojamientoTurismoRural) {
    super(a);
    this.espigas = a.espigas;
    this.tipo = a.tipo;
    this.tipoAlojamiento = "Turismo rural";
  }
}
