import { Component, OnInit } from '@angular/core';
import { UserApp } from '../entities/usuario';
import { CurrentUserService } from "../current-user.service";
import { UserService } from "../services/user-service.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  user: UserApp;

  constructor(public currentUser: CurrentUserService, public userService: UserService) { }

  ngOnInit(): void {
    this.user = this.currentUser.checkLog();
  }

  modifyPass(id: string, password: string){
    this.userService.modifyPassword(id, password);
  }

}
