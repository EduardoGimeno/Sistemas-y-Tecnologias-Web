import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Conversacion} from "../entities/conversacion";


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  getChat() {
    let conversacion1: Conversacion = {
      nomEntrada: "Alojamiento 1",
      nomUsuario: "Usuario",
      emailUsuario: "",
      emailEntrada: "",
      mensajes: [{
        texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor' +
          ' incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud' +
          ' exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        emisor: 'entry',
        hora: '14:10'},
        {
          texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor' +
            ' incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
          emisor: 'user',
          hora: '14:28'}
      ],
      active: ''
    }
    let conversacion2: Conversacion = {
      nomEntrada: "Alojamiento 2",
      nomUsuario: "Usuario",
      emailUsuario: "",
      emailEntrada: "",
      mensajes: [{
        texto: 'Hola',
        emisor: 'user',
        hora: '09:26'},
        {
          texto: '¿Que tal?',
          emisor: 'user',
          hora: '09:26'},
        {
          texto: 'Bien, ¿y tú?',
          emisor: 'entry',
          hora: '09:30'}
      ],
      active: ''
    }
    return [conversacion1, conversacion2];
  }

  getChatById(id: string) {
    let conversacion: Conversacion = {
      nomEntrada: "Alojamiento 1",
      nomUsuario: "Usuario",
      emailEntrada: "",
      emailUsuario: "",
      mensajes: [{
        texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor' +
          ' incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud' +
          ' exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        emisor: 'entry',
        hora: '14:10'},
        {
          texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor' +
            ' incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
          emisor: 'user',
          hora: '14:28'}
      ],
      active: ''
    }
    return conversacion;
  }
}
