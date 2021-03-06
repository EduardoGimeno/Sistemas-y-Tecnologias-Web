import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Conversacion } from "../entities/conversacion";
import { ChatService } from "../services/chat-service.service";
import * as $ from 'jquery';

@Component({
  selector: 'app-chat-entry',
  templateUrl: './chat-entry.component.html',
  styleUrls: ['./chat-entry.component.css']
})

export class ChatEntryComponent implements OnInit {

  id: string;
  conversacion: Conversacion;

  constructor(private route: ActivatedRoute, public chatService: ChatService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    if (this.id != null) {
      this.chatService.getChatById(this.id).subscribe(data => {
        this.conversacion = <Conversacion>data;
        console.log(this.conversacion);
      });
    }
  }

  public addMessage() {
    let newMessage = {
      texto: $('#text').text(),
      emisor: this.conversacion.nomEntrada,
      hora: new Date(Date.now()).toString()
    }
    this.conversacion.mensajes.push(newMessage);
    console.log(this.conversacion);
    this.chatService.updateChatUser(this.conversacion).subscribe(data => {
      console.log(data);
    });
  }

}
