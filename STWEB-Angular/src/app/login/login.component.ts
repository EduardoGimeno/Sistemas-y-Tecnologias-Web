import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from "../current-user.service";
import {Md5} from 'ts-md5/dist/md5';
import { UserService } from "../services/user-service.service";

import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  aviso: string;
  aviso2: string;

  constructor(public router: Router, public currentUser: CurrentUserService) { }

  ngOnInit(): void { }


  logIn() {

    let email = <string>$('#email').val();
    let password1 = <string>$("#password").val();
    if (password1.length >= 8 && email.length > 0){
      const md5 = new Md5();
      let password1 = <string>md5.appendStr(password1).end();
      this.currentUser.logIn(email, password1);
    }
    else {
       if (password1.length < 8) {
         this.aviso = "La contraseña tiene que ser minimo de 8 caracteres.";
       }
       if (email.length == 0) {
         this.aviso2 = "El campo: Email no puede estar vacío.";
       }
    }
  }


}
