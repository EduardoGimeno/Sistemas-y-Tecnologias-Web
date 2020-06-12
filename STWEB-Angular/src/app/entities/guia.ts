export class Guia {
  id: string;
  nombre: string;
  apellidos: string;
  telefono: string;
  espanol: boolean;
  ingles: boolean;
  frances: boolean;
  aleman: boolean;
  italiano: boolean;
  otros: boolean;
  tipoEntry: string;


  constructor(g) {
    this.id = g._id;
    this.nombre = g.nombre;
    this.apellidos = g.apellidos;
    this.telefono = g.telefono;
    this.espanol = g.espanol;
    this.ingles = g.ingles;
    this.frances = g.frances;
    this.aleman = g.aleman;
    this.italiano = g.italiano;
    this.otros = g.otros;
    this.tipoEntry = "Guia";
  }
}
