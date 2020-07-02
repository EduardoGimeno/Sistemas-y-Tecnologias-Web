import { Component, OnInit } from '@angular/core';
//Libreria para sacar paises y sus estados/provincias
import csc from 'country-state-city'
import { ICountry, IState, ICity } from 'country-state-city'
import {CurrentUserService} from "../current-user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserApp} from "../entities/usuario";

@Component({
  selector: 'app-registry-google',
  templateUrl: './registry-google.component.html',
  styleUrls: ['./registry-google.component.css']
})
export class RegistryGoogleComponent implements OnInit {

  user: UserApp;
  provincias = [];

  constructor(public router: Router, public currentUser: CurrentUserService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProvincias();
    this.activatedRoute.queryParams.subscribe(params => {
      let token = params['token'];
      this.currentUser.setUserByToken(token);
    });
  }

  getProvincias(){
    this.provincias = [];
    let paisN = csc.getCountryByCode(<string>$('#pais').val());
    let provinciasDevueltas = csc.getStatesOfCountry(paisN.id);
    for(let provincia of provinciasDevueltas){
     this.provincias.push(provincia.name);
    }
  }


  registroGoogle() {
    //Completar confirmación de registroGoogle
    this.user = this.currentUser.checkLog();
    console.log(this.user);
    let fecha: Date = new Date();
    let fechaFinString: string = <string>$("#fecha").val();
    let fechaFinArray = fechaFinString.split("-");
    fecha.setFullYear(+fechaFinArray[0], +fechaFinArray[1] - 1, +fechaFinArray[2]);
    this.user.fechaNacimiento = fecha;
    this.user.telefono = <string>$("#telefono").val();
    this.user.pais = <string>$("#pais").children("option:selected").text();
    this.user.provincia = <string>$("#provincia").val();
    this.user.baneado = false;
    this.user.activo = true;
    this.user.admin = false;
    this.currentUser.loginGoogle(this.user);
    //this.currentUser.updateUser(this.user);
    //this.currentUser.logIn(this.user.email, this.user.contrasena);
  }

}
