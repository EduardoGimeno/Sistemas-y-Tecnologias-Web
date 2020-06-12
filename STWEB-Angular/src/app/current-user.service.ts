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

  public updateUser(pais: string, provincia: string, email: string) {
    if (this.user != null) {
      this.user.pais = pais;
      this.user.provincia = provincia;
      this.user.email = email;
      this.user = this.userService.updateUser(this.user);
    }
    return this.user;
  }

  public modifyPassword(password: string) {
    if (this.user != null) {
      this.user.contrasena = password;
      this.user = this.userService.updateUser(this.user);
    }
    return this.user;
  }

  recoverUser() {
    this.userService.recoverUser(this.cookieService.get("token")).subscribe(data => {
      this.user = <UserApp>data;
    })
  }


}
