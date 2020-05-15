import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserApp } from '../entities/user';
import { Accommodation } from '../entities/accommodation';
import { CurrentUserService } from "../current-user.service";

@Component({
  selector: 'app-index-user',
  templateUrl: './index-user.component.html',
  styleUrls: ['./index-user.component.css']
})
export class IndexUserComponent implements OnInit {

  user: UserApp;

  entry1: Accommodation = {
    address: "",
    capacity: 0,
    email: "",
    group: "",
    municipality: "Zaragoza",
    name: "Entrada 1",
    postalCode: 0,
    province: "Zaragoza",
    region: "Aragón",
    stars: 4,
    telephone: ""
  }

  entry2: Accommodation = {
    address: "",
    capacity: 0,
    email: "",
    group: "",
    municipality: "Aladrén",
    name: "Entrada 2",
    postalCode: 0,
    province: "Zaragoza",
    region: "Aragón",
    stars: 5,
    telephone: ""
  }

  entry3: Accommodation = {
    address: "",
    capacity: 0,
    email: "",
    group: "",
    municipality: "Teruel",
    name: "Entrada 3",
    postalCode: 0,
    province: "Teruel",
    region: "Aragón",
    stars: 1,
    telephone: ""
  }

  entries: Accommodation[] = [this.entry1, this.entry2, this.entry3];

  constructor(public router: Router, public currentUser: CurrentUserService) { }

  ngOnInit(): void {
    this.user = this.currentUser.getUser();
    if (this.user == null) {
      this.router.navigateByUrl('/login');
    }
  }

  numberReturn(length){
    return new Array(length);
  }

  c() {
    this.currentUser.logIn();
  }

}
