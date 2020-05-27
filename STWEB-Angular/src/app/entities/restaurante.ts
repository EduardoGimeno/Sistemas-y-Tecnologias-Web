export class Restaurante {
  id: string;
  nombre: string;
  direccion: string;
  provincia: string;
  municipio: string;
  codigoPostal: number;
  comarca: string;
  capacidad: number;
  telefono: string;
  categoria: number;
  tipoEntry: string;

  constructor(id:string, nombre: string, direccion: string, provincia: string, municipio: string, codigoPostal: number, comarca: string, capacidad: number, telefono: string, categoria: number) {
    this.id = id;
    this.nombre = nombre;
    this.direccion = direccion;
    this.provincia = provincia;
    this.municipio = municipio;
    this.codigoPostal = codigoPostal;
    this.comarca = comarca;
    this.capacidad = capacidad;
    this.telefono = telefono;
    this.categoria = categoria;
    this.tipoEntry = "Restaurante";
  }
}
