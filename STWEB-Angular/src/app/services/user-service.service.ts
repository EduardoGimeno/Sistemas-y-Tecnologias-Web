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

  public register() {

  }

  public modifyPassword() {

  }

  public getUsers(){

  }

  public deleteUser() {

  }

}
