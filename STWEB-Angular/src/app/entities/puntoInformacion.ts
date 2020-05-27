export class PuntoInformacion {
  id: string;
  nombre: string;
  direccion: string;
  provincia: string;
  municipio: string;
  tipoEntry: string;

  constructor(id:string, nombre: string, direccion: string, provincia: string, municipio: string) {
    this.id = id;
    this.nombre = nombre;
    this.direccion = direccion;
    this.provincia = provincia;
    this.municipio = municipio;
    this.tipoEntry = "Punto de informacion";
  }
}
