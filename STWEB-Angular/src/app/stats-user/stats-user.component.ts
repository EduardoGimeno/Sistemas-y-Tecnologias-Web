import { Component, OnInit } from '@angular/core';
import { UserApp } from '../entities/usuario';
import { CurrentUserService } from "../current-user.service";

@Component({
  selector: 'app-stats-user',
  templateUrl: './stats-user.component.html',
  styleUrls: ['./stats-user.component.css']
})
export class StatsUserComponent implements OnInit {

  user: UserApp;

  constructor(public currentUser: CurrentUserService) { }

  ngOnInit(): void {
    this.user = this.currentUser.checkLog();
  }

}
