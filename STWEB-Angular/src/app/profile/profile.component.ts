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

  getProvincias(event, pais: string){
     //Devuelve las provincias de españa (id 205)
     if (pais.value == 'ES'){
      let pais = csc.getCountryByCode("ES");
      console.log(pais);
      let provinciasDevueltas = csc.getStatesOfCountry(pais.id);
      console.log(provinciasDevueltas);
      for(let provincia of provinciasDevueltas){
       this.provincias.push(provincia.name);
      }
      console.log(this.provincias)
     }
     else if(pais.value == 'IT'){
      let pais = csc.getCountryByCode("IT");
      console.log(pais);
      let provinciasDevueltas = csc.getStatesOfCountry(pais.id);
      console.log(provinciasDevueltas);
      for(let provincia of provinciasDevueltas){
       this.provincias.push(provincia.name);
      }
      console.log(this.provincias)
     }



  }

}
