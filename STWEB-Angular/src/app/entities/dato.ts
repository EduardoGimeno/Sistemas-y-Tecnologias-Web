export class Dato{
  id: string;
  nombre: string;
  valor: number;

  constructor(d) {
    this.id = d.id;
    this.nombre = d.nombre;
    this.valor = d.valor;
  }
}
