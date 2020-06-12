import { Component, OnInit } from '@angular/core';
import { UserApp } from "../entities/usuario";
import { UserService } from "../services/user-service.service";
//Libreria para sacar paises y sus estados/provincias
import csc from 'country-state-city';
import {Md5} from 'ts-md5/dist/md5';
import { ICountry, IState, ICity } from 'country-state-city'
import {CurrentUserService} from "../current-user.service";

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {
  aviso: string;
  private newUser: UserApp = null;
  provincias = [];
  constructor(public userService: UserService, public currentUser: CurrentUserService) { }

  ngOnInit(): void {
    this.getProvincias();
  }

  getProvincias() {
      this.provincias = [];
      let paisN = csc.getCountryByCode(<string>$('#pais').val());
      let provinciasDevueltas = csc.getStatesOfCountry(paisN.id);
      for(let provincia of provinciasDevueltas){
       this.provincias.push(provincia.name);
      }
  }

  registro() {
    let user = new UserApp();
    let fecha: Date = new Date();
    let fechaFinString: string = <string>$("#fecha").val();
    let fechaFinArray = fechaFinString.split("-");
    fecha.setFullYear(+fechaFinArray[0], +fechaFinArray[1] - 1, +fechaFinArray[2]);
    user.fechaNacimiento = fecha;
    user.nombre = <string>$("#nombre").val();
    user.apellidos = <string>$("#apellidos").val();
    user.email = <string>$("#email").val();
    user.telefono = <string>$("#telefono").val();
    user.pais = <string>$("#pais").children("option:selected").text();
    user.provincia = <string>$("#provincia").val();
    let pass1 = <string>$("#password1").val();
    let pass2 = <string>$("#password2").val();
    if (pass1 == pass2 && pass1.length >= 8) {
      const md5 = new Md5();
      user.contrasena = <string>md5.appendStr(pass1).end();
      this.userService.register(user).subscribe(data => {
        user = <UserApp>data;
        this.currentUser.logIn(user.email, user.contrasena);
      })
    } else if(pass1 != pass2) {
      this.aviso = "Las contraseñas no coinciden";
    } else {
      this.aviso = "La contraseña tiene que ser minimo de 8 caracteres";
    }
  }


}
