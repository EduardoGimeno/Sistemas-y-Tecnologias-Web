import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public logIn(email: string, password: string) {
    let params = new HttpParams()
      .set("email", email).set("password", password);
    return this.http.get( 'localhost:3000/logIn', {params: params});
  }

  public register(nombre: string, apellidos: string, fechaNacimiento: Date, email: string, contrasena: string,
                    telefono: string, pais: string, provincia: string, activo: boolean, baneado: boolean) {
    /* const dateUser: Date = new Date();
    let params = new HttpParams()
          .set("nombre", nombre).set("apellidos", apellidos).set(dateUser, fechaNacimiento)
          .set("email", email).set("contrasena", contrasena).set("telefono", telefono).set("pais", pais)
          .set("provincia", provincia).set("activo", activo).set("baneado", baneado);
        return this.http.post( 'localhost:8080/logIn', {params: params});
        */
  }

  public modifyPassword() {

  }

  public getUsers(){
    return this.http.get('localhost:8080/getUsers');
  }

  public deleteUser() {

  }

}
