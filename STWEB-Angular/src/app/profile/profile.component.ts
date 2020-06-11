import { Component, OnInit } from '@angular/core';
import { UserApp } from '../entities/usuario';
import { CurrentUserService } from "../current-user.service";
import { UserService } from "../services/user-service.service";
//Libreria para sacar paises y sus estados/provincias
import csc from 'country-state-city'
import { ICountry, IState, ICity } from 'country-state-city'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: UserApp;
  provincias = [];
  constructor(public currentUser: CurrentUserService) { }

  ngOnInit(): void {
    this.user = this.currentUser.checkLog();
    this.getProvincias();
  }

  update(pais: string, provincia: string, email: string) {
    if (pais == "" || pais == null) {
      pais = this.user.pais;
    }
    if (provincia == "" || provincia == null) {
      provincia = this.user.provincia;
    }
    if (email == "" || email == null) {
      email = this.user.email;
    }
    this.user = this.currentUser.updateUser(pais, provincia, email);
  }

  getProvincias(){
    this.provincias = [];
    let paisN = csc.getCountryByCode(<string>$('#letras').val());
    let provinciasDevueltas = csc.getStatesOfCountry(paisN.id);
    for(let provincia of provinciasDevueltas){
     this.provincias.push(provincia.name);
    }
  }

}
