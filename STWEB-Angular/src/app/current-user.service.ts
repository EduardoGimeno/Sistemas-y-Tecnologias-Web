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

  private token: String;

  constructor(public router: Router, private cookieService: CookieService,
              public userService: UserService) {
    if (cookieService.check("session")) {
      if (cookieService.get("session") == "open") {
        this.logIn();
      } else {
        cookieService.set("session", "close");
      }
    } else {
      cookieService.set("session", "close");
    }
  }

  public logIn() {
    this.user = {
      id: 'id',
      activo: false,
      baneado: false,
      fechaNacimiento: undefined,
      pais: 'España',
      email: 'nombre@apellidos.com',
      contrasena: '??',
      provincia: 'Zaragoza',
      apellidos: 'Apellidos',
      telefono: '000 00 00 00',
      nombre: 'Nombre'
    };
    this.cookieService.set("session", "open");
    //this.userService.logIn(email, password);
  }

  public logOut() {
    this.user = null;
    this.cookieService.set("session", "close");
  }

  public checkLog() {
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


}
