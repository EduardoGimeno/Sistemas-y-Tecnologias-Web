import { Injectable } from '@angular/core';
import { UserApp } from "./entities/usuario";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { UserService } from "./services/user-service.service";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  private user: UserApp = null;

  userAdmin: UserApp;

  private token: string;

  constructor(public router: Router, private cookieService: CookieService,
              public userService: UserService) {
    if (cookieService.check("session")) {
      if (cookieService.get("session") == "open") {
        this.recoverUser();
      } else {
        cookieService.set("session", "close");
      }
    } else {
      cookieService.set("session", "close");
    }
  }

  public setUserAdmin(user: UserApp){
    this.userAdmin = user;
  }

  public getUserAdmin(){
    return this.userAdmin;
  }

  public logIn(email, password) {
    this.userService.logIn(email, password).subscribe(user => {
      let tokenString = <string>user[0].token;
      this.token = tokenString.split(" ")[1];
      this.user = <UserApp>user[1];
      this.cookieService.set("session", "open");
      this.cookieService.set("token", this.token);
      this.router.navigateByUrl('/index-user');
    });
  }

  public logOut() {
    this.user = null;
    this.cookieService.set("session", "close");
  }

  public checkLog() {
    /*if (this.user.nombre == "") {
      return new Promise(resolve => {
        this.userService.recoverUser(this.cookieService.get("token")).subscribe(data => {
          resolve(<UserApp>data);
        }, error => {
          this.router.navigateByUrl('/login');
        });
      });
    } else {
      return new Promise(resolve => {
        resolve(this.user);
      });
    }*/
    if (this.user == null) {
      this.router.navigateByUrl('/login');
    }
    return this.user;
  }

  public updateUser(user) {
    this.userService.updateUser(user).subscribe( user => {
      this.user = <UserApp>user;
    });
  }

  recoverUser() {
    this.userService.recoverUser(this.cookieService.get("token")).subscribe(data => {
      this.user = <UserApp>data;
    })
  }

  setUserByToken(token) {
    this.userService.recoverUser(token).subscribe(data => {
      this.user = <UserApp>data;
      this.cookieService.set("session", "open");
      this.cookieService.set("token", token);
    })
  }


}
