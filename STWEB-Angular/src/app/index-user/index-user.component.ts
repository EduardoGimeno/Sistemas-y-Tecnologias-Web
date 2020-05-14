import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserApp } from '../entities/user';
import { Accommodation } from '../entities/accommodation';

@Component({
  selector: 'app-index-user',
  templateUrl: './index-user.component.html',
  styleUrls: ['./index-user.component.css']
})
export class IndexUserComponent implements OnInit {

  user: UserApp = {
    active: false,
    banned: false,
    birthDate: undefined,
    country: 'España',
    email: 'nombre@apellidos.com',
    password: '??',
    province: 'Zaragoza',
    surname: 'Apellidos',
    telephone: '000 00 00 00',
    name: 'Nombre'
  };

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

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  numberReturn(length){
    return new Array(length);
  }

}
