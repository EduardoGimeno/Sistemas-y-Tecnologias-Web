export class OficinaTurismo {
  id: string;
  nombre: string;
  direccion: string;
  provincia: string;
  telefono: string;
  horario: string;
  tipoEntry: string;

  constructor(id:string, nombre: string, direccion: string, provincia: string, telefono: string, horario: string) {
    this.id = id;
    this.nombre = nombre;
    this.direccion = direccion;
    this.provincia = provincia;
    this.telefono = telefono;
    this.horario = horario;
    this.tipoEntry = "Oficina de turismo";
  }
}
