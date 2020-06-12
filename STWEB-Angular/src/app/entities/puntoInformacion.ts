export class PuntoInformacion {
  id: string;
  nombre: string;
  direccion: string;
  provincia: string;
  municipio: string;
  tipoEntry: string;

  constructor(p) {
    this.id = p.id;
    this.nombre = p.nombre;
    this.direccion = p.direccion;
    this.provincia = p.provincia;
    this.municipio = p.municipio;
    this.tipoEntry = "Punto de informacion";
  }
}
