export class Guia {
  nombre: string;
  apellidos: string;
  telefono: string;
  espanol: boolean;
  ingles: boolean;
  frances: boolean;
  aleman: boolean;
  italiano: boolean;
  otros: string;
  tipoEntry: string;


  constructor(nombre: string, apellidos: string, telefono: string, espanol: boolean, ingles: boolean, frances: boolean, aleman: boolean, italiano: boolean, otros: string) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.telefono = telefono;
    this.espanol = espanol;
    this.ingles = ingles;
    this.frances = frances;
    this.aleman = aleman;
    this.italiano = italiano;
    this.otros = otros;
    this.tipoEntry = "Guia";
  }
}
