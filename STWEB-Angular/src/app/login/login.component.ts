import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from "../current-user.service";
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
    let email = <string>$('#email').val();
    let password = <string>$('#password').val();
    this.currentUser.logIn(email, password);
  }


}
