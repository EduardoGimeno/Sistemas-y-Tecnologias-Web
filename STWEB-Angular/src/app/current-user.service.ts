import { Injectable } from '@angular/core';
import { UserApp } from "./entities/user";
import { UserService } from "./services/user-service.service";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  private user: UserApp = null;

  constructor(public userService: UserService) {
  }

  public getUser(): UserApp {
    return this.user;
  }

  public logIn() {
    this.user = {
      active: false,
      banned: false,
      birthDate: undefined,
      country: 'España',
      email: 'nombre@apellidos.com',
      password: '??',
      province: 'Zaragoza',
      surname: 'Apellidos',
      telephone: '000 00 00 00',
      name: 'Nombre'
    };
    //this.userService.logIn(email, password);
  }

  public logOut() {
    this.user = null;
  }

}
