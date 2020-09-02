import { Component, OnInit } from '@angular/core';
import { AccionUsuarioComponent } from '../accion-usuario/accion-usuario.component';
import { Router } from "@angular/router";
import {UserApp} from "../entities/usuario";
import {UserService} from "../services/user-service.service";
import { CurrentUserService } from "../current-user.service";
import {EntryService} from "../services/entry-service.service";

@Component({
  selector: 'app-index-admin',
  templateUrl: './index-admin.component.html',
  styleUrls: ['./index-admin.component.css']
})
export class IndexAdminComponent implements OnInit {

  page = 1;
  numPages = 1;
  numTotal = 0;

  usuarios: UserApp[] = [];

  busquedaConFiltros: boolean = false;

  constructor(public userService: UserService, public router: Router, public currentService: CurrentUserService) { }

  ngOnInit(): void {
    this.search();
    this.userService.getCount().subscribe(num => {
        this.numTotal = <number>num;
        this.numPages = (this.numTotal / 20);
    });
    this.currentService.checkLog();
  }

  search() {
    this.usuarios = [];
    this.userService.getUsers(this.page - 1).subscribe(usuarios => {
      this.usuarios = <UserApp[]>usuarios;
    });
  }

  filter(click: boolean) {
    if (click) {
      this.page = 1;
    }
    this.usuarios = [];
    let nombre = <string>$('#nombreInput').val();
    let apellidos = <string>$('#apellidoInput').val();
    let email = <string>$('#emailInput').val();
    this.userService.searchUsers(nombre, apellidos, email, this.page - 1).subscribe(usuarios => {
      this.usuarios = <UserApp[]>usuarios;
      if (this.usuarios.length == 20) {
        console.log(this.usuarios.length)
        console.log(this.usuarios)
        this.userService.searchUsers(nombre, apellidos, email, this.page - 1).subscribe(usuarios => {
          if (usuarios != []) {
            this.numPages = this.page + 1;
          } else {
            this.numPages = this.page;
          }
        });
      } else {
        console.log(this.usuarios.length)
        console.log(this.usuarios)
        this.numPages = this.page;
      }
    })
  }

  paginaSiguiente() {
    this.page = this.page + 1;
    if (!this.busquedaConFiltros) {
      this.filter(false);
    } else {
      this.search();
    }
  }

  paginaAnterior() {
    this.page = this.page - 1;
    if (!this.busquedaConFiltros) {
      this.filter(false);
    } else {
      this.search();
    }
  }

  accionUsuario(i) {
    this.currentService.setUserAdmin(this.usuarios[i]);
    this.router.navigate(['/accion-usuario']);
  }

  logOut() {

  }

}
