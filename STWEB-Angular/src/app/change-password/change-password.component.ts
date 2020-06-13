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
  user: UserApp;

  constructor(public currentUser: CurrentUserService) { }

  ngOnInit(): void {
    this.user = this.currentUser.checkLog();
  }

  modifyPass(OldPassword: string, NewPassword: string, NewPassword2: string) {
    const md5 = new Md5();
    console.log(this.user.contrasena);
    console.log(<string>md5.appendStr(OldPassword).end());
    console.log(NewPassword);
    console.log(NewPassword2);
    if ((this.user.contrasena == <string>md5.appendStr(OldPassword).end()) && (NewPassword.length >= 8) &&
      (NewPassword == NewPassword2)) {
      console.log("SI")
      this.user.contrasena = <string>md5.appendStr(NewPassword).end();
      this.currentUser.updateUser(this.user);
    } else {
      console.log("NO")
    }
  }

}
