import { Component, OnInit } from '@angular/core';
import { UserApp } from '../entities/usuario';
import { Alojamiento } from '../entities/alojamiento';
import { CurrentUserService } from "../current-user.service";

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  user: UserApp;

  constructor(public currentUser: CurrentUserService) {
  }

  ngOnInit(): void {
    this.user = this.currentUser.checkLog();
  }

}
