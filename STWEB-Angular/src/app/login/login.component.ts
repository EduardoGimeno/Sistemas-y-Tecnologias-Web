import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from "../current-user.service";

import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router, public currentUser: CurrentUserService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  signInWithGoogle(): void {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
      this.authService.signOut();
  }

  logIn() {
    this.currentUser.logIn();
    this.router.navigateByUrl('index-user');
  }

}
