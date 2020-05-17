import { Injectable } from '@angular/core';
import { UserApp } from "./entities/usuario";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  private user: UserApp = null;

  private token: String;

  constructor(public router: Router, private cookieService: CookieService) {
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

}
