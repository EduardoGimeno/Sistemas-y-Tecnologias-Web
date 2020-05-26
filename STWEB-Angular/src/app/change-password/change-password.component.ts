import { Component, OnInit } from '@angular/core';
import { UserApp } from '../entities/usuario';
import { CurrentUserService } from "../current-user.service";
import { UserService } from "../services/user-service.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  user: UserApp;

  constructor(public currentUser: CurrentUserService) { }

  ngOnInit(): void {
    this.user = this.currentUser.checkLog();
  }

  modifyPass(OldPassword: string, NewPassword: string, NewPassword2: string) {
    if (this.user.contrasena == OldPassword && NewPassword != "" && NewPassword != null && NewPassword == NewPassword2) {
      this.user = this.currentUser.modifyPassword(NewPassword);
      console.log("CONTRASEÑA VIEJA: " + OldPassword);
      console.log("CONTRASEÑA ACTUAL: " + NewPassword);
    }
  }

}
