import { Component, OnInit } from '@angular/core';
import { UserApp } from "../entities/usuario";
import { UserService } from "../services/user-service.service";
//Libreria para sacar paises y sus estados/provincias
import csc from 'country-state-city'
import { ICountry, IState, ICity } from 'country-state-city'

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {
  private newUser: UserApp = null;
  provincias = [];
  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.getProvincias();
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
