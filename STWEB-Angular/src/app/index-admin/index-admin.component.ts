import { Component, OnInit } from '@angular/core';
import { AccionUsuarioComponent } from '../accion-usuario/accion-usuario.component';
import { Router } from "@angular/router";
import {UserApp} from "../entities/usuario";
import {UserService} from "../services/user-service.service";

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

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.search();
    this.userService.getCount().subscribe(num => {
        this.numTotal = <number>num;
        this.numPages = (this.numTotal / 20);
    });
  }

  search() {
    this.userService.getUsers(this.page - 1).subscribe(usuarios => {
      this.usuarios = <UserApp[]>usuarios;
      console.log(usuarios);
      console.log(this.usuarios);
    });
  }

  filter() {

  }

  paginaSiguiente() {
    this.page = this.page + 1;
    if (!this.busquedaConFiltros) {
      this.filter(this.selectedIndex);
    } else {
      this.search();
    }
  }

  paginaAnterior() {
    this.page = this.page - 1;
    if (!this.busquedaConFiltros) {
      this.filter(this.selectedIndex);
    } else {
      this.search();
    }
  }

  accionUsuario() {

  }

}
