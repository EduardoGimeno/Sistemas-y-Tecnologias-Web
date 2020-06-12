export class OficinaTurismo {
  id: string;
  nombre: string;
  direccion: string;
  provincia: string;
  telefono: string;
  horario: string;
  tipoEntry: string;

  constructor(o) {
    this.id = o._id;
    this.nombre = o.nombre;
    this.direccion = o.direccion;
    this.provincia = o.provincia;
    this.telefono = o.telefono;
    this.horario = o.horario;
    this.tipoEntry = "Oficina de turismo";
  }
}
