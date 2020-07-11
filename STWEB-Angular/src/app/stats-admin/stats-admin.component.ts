import { Component, OnInit } from '@angular/core';
import { UserApp } from '../entities/usuario';
import { CurrentUserService } from "../current-user.service";

@Component({
  selector: 'app-stats-admin',
  templateUrl: './stats-admin.component.html',
  styleUrls: ['./stats-admin.component.css']
})
export class StatsAdminComponent implements OnInit {
  user: UserApp;

  constructor(public currentUser: CurrentUserService) { }

  ngOnInit(): void {
    this.user = this.currentUser.checkLog();
  }

}
