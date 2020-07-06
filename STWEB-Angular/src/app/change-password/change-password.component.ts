import { Component, OnInit } from '@angular/core';
import { UserApp } from '../entities/usuario';
import { CurrentUserService } from "../current-user.service";
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {


  aviso: string;
  aviso2: string;
  aviso3: string;
  user: UserApp;

  constructor(public currentUser: CurrentUserService) { }

  ngOnInit(): void {
    this.user = this.currentUser.checkLog();
  }

  modifyPass(OldPassword: string, NewPassword: string, NewPassword2: string) {
    this.limpiarAvisos();
    const md5 = new Md5();
    if ((this.user.contrasena == <string>md5.appendStr(OldPassword).end()) && (NewPassword.length >= 8) &&
      (NewPassword == NewPassword2)) {
      this.user.contrasena = <string>md5.appendStr(NewPassword).end();
      this.currentUser.updateUser(this.user);
    }
    else {
     if(NewPassword != NewPassword2){
       this.aviso2 = "Confirme correctamente la nueva contraseña. (Las contraseñas introducidas son distintas)";
     }
     if(NewPassword.length < 8) {
       this.aviso = "La contraseña debe tener al menos 8 caracteres.";
     }
     if(this.user.contrasena != <string>md5.appendStr(OldPassword).end()) {
       this.aviso3 = "La contraseña actual es incorrecta.";
     }
    }
  }

  limpiarAvisos() {
      this.aviso = "";
      this.aviso2 = "";
      this.aviso3 = "";
  }

}
