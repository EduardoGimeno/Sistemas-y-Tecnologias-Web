import { Injectable } from '@angular/core';
import { UserApp } from "./entities/usuario";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { UserService } from "./services/user-service.service";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  private user: UserApp = null;
  userB = new BehaviorSubject(null);

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

  getUser(): Observable<UserApp> {
    return this.userB.asObservable();
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
      if (this.user.admin) {
        this.router.navigateByUrl('/index-admin');
      } else {
        this.router.navigateByUrl('/index-user');
      }
    });
  }

  public logOut() {
    this.user = null;
    this.cookieService.set("session", "close");
  }

  public checkLog() {
    if (this.user == null) {
      if (this.cookieService.get("session") == "open") {
        this.userService.recoverUser(this.cookieService.get("token")).subscribe(data => {
          this.userB.next(this.user);
          this.user = <UserApp>data[0];
        });
      } else {
        this.router.navigateByUrl('/login');
      }
    } else {
      return this.user;
    }
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
      this.user = <UserApp>data[0];
      this.cookieService.set("session", "open");
      this.cookieService.set("token", token);
      if (this.user.pais != null) {
        this.router.navigateByUrl('/index-user');
      }
    })
  }

  loginGoogle(user) {
    this.userService.updateUser(user).subscribe( user => {
      this.user = <UserApp>user;
      this.router.navigateByUrl('/index-user');
    });
  }


}
