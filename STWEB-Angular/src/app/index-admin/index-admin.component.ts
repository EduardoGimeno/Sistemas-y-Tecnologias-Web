import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccionUsuarioComponent } from '../accion-usuario/accion-usuario.component';

@Component({
  selector: 'app-index-admin',
  templateUrl: './index-admin.component.html',
  styleUrls: ['./index-admin.component.css']
})
export class IndexAdminComponent implements OnInit {

  constructor(public matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  accionSobreUsuario() {
    this.matDialog.open(AccionUsuarioComponent, {
     width: '400px',
     height: '400px'
    });
  }

}
