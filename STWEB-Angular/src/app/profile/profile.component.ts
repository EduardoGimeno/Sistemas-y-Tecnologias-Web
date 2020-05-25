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

  constructor(public currentUser: CurrentUserService, public userService: UserService) { }

  ngOnInit(): void {
    this.user = this.currentUser.checkLog();
  }

  update(pais: string, provincia: string, email: string) {
      this.userService.updateUser(pais, provincia, email);
  }

}
