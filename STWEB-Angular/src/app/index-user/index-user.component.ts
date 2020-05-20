import { Component, OnInit } from '@angular/core';
import { UserApp } from '../entities/usuario';
import { Alojamiento } from '../entities/alojamiento';
import { CurrentUserService } from "../current-user.service";
import { EntryService } from "../services/entry-service.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-index-user',
  templateUrl: './index-user.component.html',
  styleUrls: ['./index-user.component.css']
})
export class IndexUserComponent implements OnInit {

  user: UserApp;

  entries: Alojamiento[];

  showEntries: Alojamiento[] = [];

  constructor(public currentUser: CurrentUserService, public entryService: EntryService,
              public route: Router) { }

  ngOnInit(): void {
    this.user = this.currentUser.checkLog();
    this.entries = this.entryService.getEntries();
    this.showEntries = this.entries;
  }

  numberReturn(length){
    return new Array(length);
  }

  selection(event) {
    this.showEntries = [];
    if (event.target.selectedIndex == 1) {
      for (let entry of this.entries) {
        if (entry.tipoAlojamiento == 'Turismo rural') {
          this.showEntries.push(entry);
        }
      }
    } else if (event.target.selectedIndex == 2) {
      for (let entry of this.entries) {
        if (entry.tipoAlojamiento == 'Apartamento') {
          this.showEntries.push(entry);
        }
      }
    } else if (event.target.selectedIndex == 3) {
      for (let entry of this.entries) {
        if (entry.tipoAlojamiento == 'Camping') {
          this.showEntries.push(entry);
        }
      }
    } else if (event.target.selectedIndex == 4) {
      for (let entry of this.entries) {
        if (entry.tipoAlojamiento == 'Hotel') {
          this.showEntries.push(entry);
        }
      }
    } else if (event.target.selectedIndex == 5) {
      for (let entry of this.entries) {
        if (entry.tipoAlojamiento == 'Refugio') {
          this.showEntries.push(entry);
        }
      }
    } else {
      this.showEntries = this.entries;
    }
  }

  navigateToEntry(entry) {
    this.route.navigateByUrl('/entry?tipo=' + entry.tipoAlojamiento.toLowerCase().substr(0,3) +
      '&id=' + entry.id);
  }


}
