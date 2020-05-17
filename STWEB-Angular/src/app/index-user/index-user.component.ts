import { Component, OnInit } from '@angular/core';
import { UserApp } from '../entities/usuario';
import { Alojamiento } from '../entities/alojamiento';
import { CurrentUserService } from "../current-user.service";
import { EntryService } from "../services/entry-service.service";

@Component({
  selector: 'app-index-user',
  templateUrl: './index-user.component.html',
  styleUrls: ['./index-user.component.css']
})
export class IndexUserComponent implements OnInit {

  user: UserApp;

  entries: Alojamiento[];

  constructor(public currentUser: CurrentUserService, public entryService: EntryService) { }

  ngOnInit(): void {
    this.user = this.currentUser.checkLog();
    this.entries = this.entryService.getEntries();
  }

  numberReturn(length){
    return new Array(length);
  }

}
