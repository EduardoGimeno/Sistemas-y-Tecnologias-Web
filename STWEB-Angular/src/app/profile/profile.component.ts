import { Component, OnInit } from '@angular/core';
import { UserApp } from '../entities/usuario';
import { CurrentUserService } from "../current-user.service";
import { UserService } from "../services/user-service.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: UserApp;

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

}
