import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from "../current-user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router, public currentUser: CurrentUserService) { }

  ngOnInit(): void {
  }

  logIn() {
    this.currentUser.logIn();
    this.router.navigateByUrl('index-user');
  }

}
