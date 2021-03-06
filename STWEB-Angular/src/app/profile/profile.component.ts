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

  pageName = "Perfil";

  user: UserApp;
  provincias = [];

  eliminarBool = false;
  constructor(public currentUser: CurrentUserService, public userService: UserService) { }

  ngOnInit(): void {
    this.currentUser.getUser().subscribe(user => {
      if (user != null) {
        this.user = <UserApp>user[0];
      }
    });
    this.user = this.currentUser.checkLog();
    this.getProvincias();
  }

  update() {
    this.user.pais = <string>$("#pais").children("option:selected").text();
    this.user.provincia = <string>$("#provincia").val();
    this.currentUser.updateUser(this.user);
  }

  getProvincias(){
    this.provincias = [];
    let paisN = csc.getCountryByCode(<string>$('#pais').val());
    let provinciasDevueltas = csc.getStatesOfCountry(paisN.id);
    for(let provincia of provinciasDevueltas){
     this.provincias.push(provincia.name);
    }
  }

  eliminarPrevious() {
    this.eliminarBool = !this.eliminarBool;
  }

  eliminar() {
    this.user.activo = false;
    this.userService.updateUser(this.user).subscribe(data => {
      console.log(data);
    });
    this.currentUser.logOut();
  }

}
