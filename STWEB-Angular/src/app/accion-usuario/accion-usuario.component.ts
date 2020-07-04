import { Component, OnInit } from '@angular/core';
import { UserApp } from '../entities/usuario';
import { CurrentUserService } from "../current-user.service";
import {UserService} from "../services/user-service.service";

@Component({
  selector: 'app-accion-usuario',
  templateUrl: './accion-usuario.component.html',
  styleUrls: ['./accion-usuario.component.css']
})
export class AccionUsuarioComponent implements OnInit {
  user: UserApp;

  constructor(public currentUser: CurrentUserService, public userService: UserService) { }

  ngOnInit(): void {
    this.user = this.currentUser.getUserAdmin();
  }

  ban(days: number) {
    let todayDate = new Date();
    let date = new Date(new Date().setDate(todayDate.getDate() + days));
    this.user.baneado = true;
    this.user.activo = false;
    this.user.finBan = date;
    this.userService.updateUser(this.user).subscribe(data => {
      console.log(data);
    });
    console.log(this.user);
  }

  eliminar() {

  }

  enviarEmail() {
    console.log(<string>$('#textEmail').val());
    //this.userService.sendEmail(this.user.email, <string>$('#textEmail$').val());
  }

  accept() {
    if ($('#inhabilitar7').prop('checked')) {
      console.log(1);
      this.ban(7);
    } else if ($('#inhabilitar30').prop('checked')) {
      console.log(2);
      this.ban(30);
    } else if ($('#inhabilitar365').prop('checked')) {
      console.log(3);
      this.ban(365);
    } else if ($('#eliminar').prop('checked')) {
      console.log(4);
      this.eliminar();
    } else if ($('#enviar').prop('checked')) {
      console.log(5);
      this.enviarEmail();
    }
  }


}
