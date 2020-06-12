import { Component, OnInit } from '@angular/core';
//Libreria para sacar paises y sus estados/provincias
import csc from 'country-state-city'
import { ICountry, IState, ICity } from 'country-state-city'

@Component({
  selector: 'app-registry-google',
  templateUrl: './registry-google.component.html',
  styleUrls: ['./registry-google.component.css']
})
export class RegistryGoogleComponent implements OnInit {

  provincias = [];

  constructor() { }

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

  registroGoogle(nacimiento: Date, telefono: string, pais: string, provincia: string) {
    //Completar confirmación de registroGoogle
  }

}
