import { Component, OnInit } from '@angular/core';
import { UserApp } from "../entities/usuario";
import { UserService } from "../services/user-service.service";

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {
  private newUser: UserApp = null;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

  registerUser(name: string, apellidos: string, nacimiento: Date, telefono: string, pais: string,
    provincia: string, email: string, password1: string, password2: string) {
    this.newUser = {
          id: 'id',
          activo: false,
          baneado: false,
          fechaNacimiento: nacimiento,
          pais: pais,
          email: email,
          contrasena: password1,
          provincia: provincia,
          apellidos: apellidos,
          telefono: telefono,
          nombre: name
        };
        this.userService.register(this.newUser);
  }

}
