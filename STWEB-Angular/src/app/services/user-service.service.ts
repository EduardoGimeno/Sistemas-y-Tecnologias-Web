import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { UserApp } from "../entities/usuario";
import {CurrentUserService} from "../current-user.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlApp: string = "https://back-turismoaragon.herokuapp.com/users";
  private urlAppGoogle: string = "https://back-turismoaragon.herokuapp.com/auth/google";

  constructor(private http: HttpClient, private cookieService: CookieService) {

   }

  public logIn(email: string, password: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'});
    let options = { headers: headers };
    let json = {'email': email, 'password': password};
    return this.http.post( this.urlApp + '/login', JSON.stringify(json), options);
  }

  getCount() {
    let headers = new HttpHeaders({
      'authentication': this.cookieService.get("token")});
    return this.http.get(this.urlApp + "/count", {headers:headers});
  }

  public loginGoogle() {
    return this.http.get( this.urlAppGoogle );
  }

  public register(user: UserApp) {
    return this.http.post( this.urlApp + '/add/', user);
  }

  public getUsers(page){
    let headers = new HttpHeaders({
      'authentication': this.cookieService.get("token")});
    let params = new HttpParams()
      .set("page", page.toString());
    return this.http.get(this.urlApp + '/', {params:params, headers:headers});
  }

  public updateUser(user: UserApp) {
    let headers = new HttpHeaders({
      'authentication': this.cookieService.get("token")});
      delete user["_id"];
      return this.http.put( this.urlApp + '/update/', user, {headers:headers});
  }

  searchUsers(nombre, apellidos, email, page) {
    let headers = new HttpHeaders({
      'authentication': this.cookieService.get("token")});
    let params = new HttpParams()
      .set("nombre", nombre)
      .set("surname", apellidos)
      .set("email", email)
      .set("page", page);
    return this.http.get(this.urlApp + '/search', {params:params, headers:headers});
  }

  recoverUser(token) {
    let params = new HttpParams()
      .set("token", token);
    return this.http.get(this.urlApp + '/getUser', {params:params});
  }


}
