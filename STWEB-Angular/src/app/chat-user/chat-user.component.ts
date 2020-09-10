import { Component, OnInit } from '@angular/core';
import { UserApp } from '../entities/usuario';
import { CurrentUserService } from "../current-user.service";
import { Conversacion } from "../entities/conversacion";
import { ChatService } from "../services/chat-service.service";
import * as $ from 'jquery';

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.css']
})
export class ChatUserComponent implements OnInit {

  pageName = "Conversaciones";

  user: UserApp;
  conversaciones: Conversacion[] = [];
  conversacionActive: Conversacion = new Conversacion();
  conversacionActiveID: number;

  constructor(public currentUser: CurrentUserService, public chatService: ChatService) { }

  ngOnInit(): void {
    this.currentUser.getUser().subscribe(user => {
      if (user != null) {
        this.user = <UserApp>user[0];
        this.getChats();
      }
    });
    this.user = this.currentUser.checkLog();
    this.getChats();
  }

  public getChats() {
    this.chatService.getChat(this.user.email).subscribe(data => {
      this.conversaciones = <Conversacion[]>data;
      this.conversaciones[0].active = 'active';
      this.changeConversacion(0);
    });
  }


  public changeConversacion(i: number) {
    for (let conversacion of this.conversaciones) {
      conversacion.active = '';
    }
    this.conversaciones[i].active = 'active';
    this.conversacionActive = this.conversaciones[i];
    this.conversacionActiveID = i;
    console.log(this.conversacionActive);
  }

  public addMessage() {
    let newMessage = {
      texto: $('#text').text(),
      emisor: this.user.nombre,
      hora: new Date(Date.now()).toString()
    }
    this.conversaciones[this.conversacionActiveID].mensajes.push(newMessage);
    this.chatService.updateChatEntry(this.conversaciones[this.conversacionActiveID]).subscribe(data => {
      console.log(data);
    });
    this.changeConversacion(this.conversacionActiveID);
  }

}
