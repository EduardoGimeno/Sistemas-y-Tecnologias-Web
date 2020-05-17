import { Component, OnInit } from '@angular/core';
import { UserApp } from '../entities/usuario';
import { Alojamiento } from '../entities/alojamiento';
import { CurrentUserService } from "../current-user.service";

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.css']
})
export class ChatUserComponent implements OnInit {

  user: UserApp;

  constructor(public currentUser: CurrentUserService) { }

  ngOnInit(): void {
    this.user = this.currentUser.checkLog();
  }

}
