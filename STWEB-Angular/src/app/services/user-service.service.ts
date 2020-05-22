import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { UserApp } from "../entities/usuario";

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

  public register(user: UserApp) {
    return this.http.post( 'localhost:3000/register', user);
  }

  public modifyPassword(id: number, password: string) {
    return this.http.patch( 'localhost:3000/modifyPassword/' + id, password);
  }

  public getUsers(){
    return this.http.get('localhost:3000/getUsers');
  }

  public deleteUser(id: number) {
    return this.http.delete('localhost:3000/delete/' + id);
  }

}
