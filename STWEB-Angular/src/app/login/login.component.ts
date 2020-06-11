import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from "../current-user.service";
import { UserService } from "../services/user-service.service";

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


  constructor(public router: Router, public currentUser: CurrentUserService,
              private authService: AuthService, public userService: UserService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
          this.user = user;
          this.loggedIn = (user != null);
        });

  }


  signInWithGoogle(): void {
      //on success
      //this will return user data from google. What you need is a user token which you will send it to the server
      /*this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((googleUser) => {
            this.userService.sendTokenToBackEnd(googleUser.idToken);
      });*/
    this.userService.loginGoogle().subscribe(data => {
      console.log(data);
    });
  }



  signOut(): void {
      this.authService.signOut();
  }

  logIn() {
    let email = <string>$('#email').val();
    let password = <string>$('#password').val();
    this.currentUser.logIn();
    this.userService.getUsers().subscribe(data => {
      console.log(data);
    });
    this.userService.logIn(email, password).subscribe(data  => {
      console.log(data);
    });
    this.router.navigateByUrl('index-user');
  }

}
