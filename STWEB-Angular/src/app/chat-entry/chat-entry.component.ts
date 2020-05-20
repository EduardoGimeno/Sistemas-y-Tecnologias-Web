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
      this.conversacion = this.chatService.getChatById(this.id);
    }
  }

  public addMessage() {
    let newMessage = {
      texto: $('#text').text(),
      emisor: 'entry',
      hora: '00:00'
    }
    this.conversacion.mensajes.push(newMessage);
  }

}
