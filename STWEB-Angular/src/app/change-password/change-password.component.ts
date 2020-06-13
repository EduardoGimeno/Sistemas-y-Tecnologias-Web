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

  user: UserApp;

  constructor(public currentUser: CurrentUserService) { }

  ngOnInit(): void {
    this.user = this.currentUser.checkLog();
  }

  modifyPass(OldPassword: string, NewPassword: string, NewPassword2: string) {
    if (this.user.contrasena == OldPassword && NewPassword != "" && NewPassword != null && NewPassword == NewPassword2) {
      const md5 = new Md5();
      this.user.contrasena = <string>md5.appendStr(NewPassword).end();
      this.currentUser.updateUser(this.user);
    }
  }

}
