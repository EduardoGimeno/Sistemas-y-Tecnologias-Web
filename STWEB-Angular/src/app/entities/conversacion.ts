export class Conversacion {
  nombreEntry: string;
  nombreUser: string;
  mensajes: {
    texto:string,
    emisor:string,
    hora:string
  }[];
  active: string;
}
