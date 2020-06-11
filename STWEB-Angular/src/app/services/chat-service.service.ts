import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Conversacion} from "../entities/conversacion";


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private urlApp: string = "https://back-turismoaragon.herokuapp.com/chats";

  constructor(private http: HttpClient) { }

  addChat(nomEntrada, nomUsuario, emailEntrada, emailUsuario) {
    let conver: Conversacion = {
      nomEntrada: nomEntrada,
      nomUsuario: nomUsuario,
      emailUsuario: emailUsuario,
      emailEntrada: emailEntrada,
      mensajes: [],
      active: ''
    }
    return this.http.post( this.urlApp + '/add', conver);
  }

  updateChatEntry(chat: Conversacion) {
    return this.http.put( this.urlApp + '/updateEntry', chat);
  }

  updateChatUser(chat: Conversacion) {
    return this.http.put( this.urlApp + '/updateUser', chat);
  }

  getChat(email) {
    let params = new HttpParams()
      .set("user", email);
    return this.http.get( this.urlApp + '/getChats', {params:params});
  }

  getChatById(id: string) {
    let params = new HttpParams()
      .set("id", id);
    return this.http.get( this.urlApp + '/getChat', {params:params});
  }

}
