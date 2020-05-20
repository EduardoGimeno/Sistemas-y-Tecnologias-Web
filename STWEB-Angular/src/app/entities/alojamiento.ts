export class Alojamiento {
  id: string;
  nombre: string;
  direccion: string;
  codigoPostal: number;
  provincia: string;
  comarca: string;
  municipio: string;
  capacidad: number;
  email: string;
  telefono: string;
  tipoAlojamiento: string;

  constructor(a: Alojamiento) {
    this.id = a.id;
    this.nombre = a.nombre;
    this.direccion = a.direccion;
    this.codigoPostal = a.codigoPostal;
    this.provincia = a.provincia;
    this.comarca = a.comarca;
    this.municipio = a.municipio;
    this.capacidad = a.capacidad;
    this.email = a.email;
    this.telefono = a.telefono;
    this.tipoAlojamiento = "Alojamiento";
  }
}
