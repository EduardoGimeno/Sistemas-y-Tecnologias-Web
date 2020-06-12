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

  constructor(public router: Router, public currentUser: CurrentUserService) { }

  ngOnInit(): void { }


  logIn() {
    const md5 = new Md5();
    let email = <string>$('#email').val();
    let password = <string>md5.appendStr(<string>$('#password').val()).end();
    this.currentUser.logIn(email, password);
  }


}
