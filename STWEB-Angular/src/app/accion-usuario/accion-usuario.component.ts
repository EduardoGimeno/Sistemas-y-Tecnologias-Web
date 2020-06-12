import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-accion-usuario',
  templateUrl: './accion-usuario.component.html',
  styleUrls: ['./accion-usuario.component.css']
})
export class AccionUsuarioComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AccionUsuarioComponent>) { }

  ngOnInit(): void {
  }

  onCancelClick(): void {
           this.dialogRef.close();
  }

}
