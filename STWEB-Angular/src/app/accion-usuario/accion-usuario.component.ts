import { Component, OnInit } from '@angular/core';
import { UserApp } from '../entities/usuario';
import { CurrentUserService } from "../current-user.service";

@Component({
  selector: 'app-accion-usuario',
  templateUrl: './accion-usuario.component.html',
  styleUrls: ['./accion-usuario.component.css']
})
export class AccionUsuarioComponent implements OnInit {
  user: UserApp;

  constructor(public currentUser: CurrentUserService) { }

  ngOnInit(): void {
    this.user = this.currentUser.getUserAdmin();
  }



}
