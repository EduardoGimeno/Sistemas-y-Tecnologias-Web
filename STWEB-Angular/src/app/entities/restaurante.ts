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

  constructor(r) {
    this.id = r._id;
    this.nombre = r.nombre;
    this.direccion = r.direccion;
    this.provincia = r.provincia;
    this.municipio = r.municipio;
    this.codigoPostal = r.codigoPostal;
    this.comarca = r.comarca;
    this.capacidad = r.capacidad;
    this.telefono = r.telefono;
    this.categoria = r.categoria;
    this.tipoEntry = "Restaurante";
  }
}
