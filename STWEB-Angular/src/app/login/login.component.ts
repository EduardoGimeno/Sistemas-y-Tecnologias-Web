import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from "../current-user.service";

import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: SocialUser;
  private loggedIn: boolean;


  constructor(public router: Router, public currentUser: CurrentUserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
          this.user = user;
          this.loggedIn = (user != null);
        });

  }


  signInWithGoogle(): void {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token; //Token para el backend
  }

  signOut(): void {
      this.authService.signOut();
  }

  logIn() {
    this.currentUser.logIn();
    this.router.navigateByUrl('index-user');
  }

}
