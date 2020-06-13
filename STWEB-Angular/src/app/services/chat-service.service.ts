import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Conversacion} from "../entities/conversacion";
import {CookieService} from "ngx-cookie-service";


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private urlApp: string = "https://back-turismoaragon.herokuapp.com/chats";

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  addChat(nomEntrada, nomUsuario, emailEntrada, emailUsuario) {
    let headers = new HttpHeaders({
      'authentication': this.cookieService.get("token")});
    let conver: Conversacion = {
      nomEntrada: nomEntrada,
      nomUsuario: nomUsuario,
      emailUsuario: emailUsuario,
      emailEntrada: emailEntrada,
      mensajes: [],
      active: ''
    }
    return this.http.post( this.urlApp + '/add', conver, {headers:headers});
  }

  updateChatEntry(chat: Conversacion) {
    let headers = new HttpHeaders({
      'authentication': this.cookieService.get("token")});
    return this.http.put( this.urlApp + '/updateEntry', chat, {headers:headers});
  }

  updateChatUser(chat: Conversacion) {
    return this.http.put( this.urlApp + '/updateUser', chat);
  }

  getChat(email) {
    let headers = new HttpHeaders({
      'authentication': this.cookieService.get("token")});
    let params = new HttpParams()
      .set("user", email);
    return this.http.get( this.urlApp + '/getChats', {params:params, headers:headers});
  }

  getChatById(id: string) {
    let params = new HttpParams()
      .set("id", id);
    return this.http.get( this.urlApp + '/getChat', {params:params});
  }

}
