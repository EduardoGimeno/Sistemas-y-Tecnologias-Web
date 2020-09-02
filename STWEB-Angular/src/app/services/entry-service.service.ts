import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private urlApp: string = "https://back-turismoaragon.herokuapp.com";

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getCount(tipo: string) {
    let headers = new HttpHeaders({
      'authentication': this.cookieService.get("token")});
    return this.http.get(this.urlApp + "/" + tipo + "/count", {headers:headers});
  }

  public getHoteles(page: number) {
    let headers = new HttpHeaders({
      'authentication': this.cookieService.get("token")});
    let params = new HttpParams()
      .set("page", page.toString());
    return this.http.get(this.urlApp + "/hotels/getAll", {params:params, headers:headers});
  }

  public getHotelesMunicipio() {
      let headers = new HttpHeaders({
        'authentication': this.cookieService.get("token")});
      return this.http.get(this.urlApp + "/statistics/hotelsPerMunicipality", {headers:headers});
    }

  public getTurismosRurales(page: number) {
    let headers = new HttpHeaders({
      'authentication': this.cookieService.get("token")});
    let params = new HttpParams()
      .set("page", page.toString());
    return this.http.get(this.urlApp + "/ruralHouses/getAll", {params:params, headers:headers});
  }

  public getApartamentos(page: number) {
    let headers = new HttpHeaders({
      'authentication': this.cookieService.get("token")});
    let params = new HttpParams()
      .set("page", page.toString());
    return this.http.get(this.urlApp + "/apartments/getAll", {params:params, headers:headers});
  }

  public getCampings(page: number) {
    let headers = new HttpHeaders({
      'authentication': this.cookieService.get("token")});
    let params = new HttpParams()
      .set("page", page.toString());
    return this.http.get(this.urlApp + "/campings/getAll", {params:params, headers:headers});
  }

  public getRefugios(page: number) {
    let headers = new HttpHeaders({
      'authentication': this.cookieService.get("token")});
    let params = new HttpParams()
      .set("page", page.toString());
    return this.http.get(this.urlApp + "/shelters/getAll", {params:params, headers:headers});
  }

  public getRestaurantes(page: number) {
    let headers = new HttpHeaders({
      'authentication': this.cookieService.get("token")});
    let params = new HttpParams()
      .set("page", page.toString());
    return this.http.get(this.urlApp + "/restaurants/getAll", {params:params, headers:headers});
  }

  public getOficinasTurismo(page: number) {
    let headers = new HttpHeaders({
      'authentication': this.cookieService.get("token")});
    let params = new HttpParams()
      .set("page", page.toString());
    return this.http.get(this.urlApp + "/touristOffices/getAll", {params:params, headers:headers});
  }

  public getPuntosInformacion(page: number) {
    let headers = new HttpHeaders({
      'authentication': this.cookieService.get("token")});
    let params = new HttpParams()
      .set("page", page.toString());
    return this.http.get(this.urlApp + "/informationPoints/getAll", {params:params, headers:headers});
  }

  public getGuias(page: number) {
    let headers = new HttpHeaders({
      'authentication': this.cookieService.get("token")});
    let params = new HttpParams()
      .set("page", page.toString());
    return this.http.get(this.urlApp + "/guides/getAll", {params:params, headers:headers});
  }

  public getHotel(id) {
    let headers = new HttpHeaders({
      'authentication': this.cookieService.get("token")});
    let params = new HttpParams()
      .set("id", id.toString());
    return this.http.get(this.urlApp + "/hotels/get", {params:params, headers:headers});
  }

  public getTurismoRural(id) {
    let headers = new HttpHeaders({
      'authentication': this.cookieService.get("token")});
    let params = new HttpParams()
      .set("id", id.toString());
    return this.http.get(this.urlApp + "/ruralHouses/get", {params:params, headers:headers});
  }

  public getApartamento(id) {
    let headers = new HttpHeaders({
      'authentication': this.cookieService.get("token")});
    let params = new HttpParams()
      .set("id", id.toString());
    return this.http.get(this.urlApp + "/apartments/get", {params:params, headers:headers});
  }

  public getCamping(id) {
    let headers = new HttpHeaders({
      'authentication': this.cookieService.get("token")});
    let params = new HttpParams()
      .set("id", id.toString());
    return this.http.get(this.urlApp + "/campings/get", {params:params, headers:headers});
  }

  public getRefugio(id) {
    let headers = new HttpHeaders({
      'authentication': this.cookieService.get("token")});
    let params = new HttpParams()
      .set("id", id.toString());
    return this.http.get(this.urlApp + "/shelters/get", {params:params, headers:headers});
  }

  public getRestaurante(id) {
    let headers = new HttpHeaders({
      'authentication': this.cookieService.get("token")});
    let params = new HttpParams()
      .set("id", id.toString());
    return this.http.get(this.urlApp + "/restaurants/get", {params:params, headers:headers});
  }

  public getOficinaTurismo(id) {
    let headers = new HttpHeaders({
      'authentication': this.cookieService.get("token")});
    let params = new HttpParams()
      .set("id", id.toString());
    return this.http.get(this.urlApp + "/touristOffices/get", {params:params, headers:headers});
  }

  public getPuntoInformacion(id) {
    let headers = new HttpHeaders({
      'authentication': this.cookieService.get("token")});
    let params = new HttpParams()
      .set("id", id.toString());
    return this.http.get(this.urlApp + "/informationPoints/get", {params:params, headers:headers});
  }

  public getGuia(id) {
    let headers = new HttpHeaders({
      'authentication': this.cookieService.get("token")});
    let params = new HttpParams()
      .set("id", id.toString());
    return this.http.get(this.urlApp + "/guides/get", {params:params, headers:headers});
  }

  public searchHoteles(provincia, region, municipio, estrellasMin, estrellasMax, page) {
    let headers = new HttpHeaders({
      'authentication': this.cookieService.get("token")});
    let params = new HttpParams()
      .set("province", provincia)
      .set("region", region)
      .set("municipality", municipio)
      .set("minStars", estrellasMin.toString())
      .set("maxStars", estrellasMax.toString())
      .set("page", page.toString());
    return this.http.get(this.urlApp + "/hotels/search", {params:params, headers:headers});
  }

  public searchTurismoRurales(provincia, region, municipio, espigasMin, espigasMax, page) {
    let headers = new HttpHeaders({
      'authentication': this.cookieService.get("token")});
    let params = new HttpParams()
      .set("province", provincia)
      .set("region", region)
      .set("municipality", municipio)
      .set("minSpikes", espigasMin.toString())
      .set("maxSpikes", espigasMax.toString())
      .set("page", page.toString());
    return this.http.get(this.urlApp + "/ruralHouses/search", {params:params, headers:headers});
  }

  public searchApartamentos(provincia, region, municipio, page) {
    let headers = new HttpHeaders({
      'authentication': this.cookieService.get("token")});
    let params = new HttpParams()
      .set("province", provincia)
      .set("region", region)
      .set("municipality", municipio)
      .set("page", page.toString());
    return this.http.get(this.urlApp + "/apartments/search", {params:params, headers:headers});
  }

  public searchCampings(provincia, region, municipio, page) {
    let headers = new HttpHeaders({
      'authentication': this.cookieService.get("token")});
    let params = new HttpParams()
      .set("province", provincia)
      .set("region", region)
      .set("municipality", municipio)
      .set("page", page.toString());
    return this.http.get(this.urlApp + "/campings/search", {params:params, headers:headers});
  }

  public searchRefugios(provincia, region, municipio, page) {
    let headers = new HttpHeaders({
      'authentication': this.cookieService.get("token")});
    let params = new HttpParams()
      .set("province", provincia)
      .set("region", region)
      .set("municipality", municipio)
      .set("page", page.toString());
    return this.http.get(this.urlApp + "/shelters/search", {params:params, headers:headers});
  }

  public searchRestaurantes(provincia, region, municipio, categoriaMin, categoriaMax, page) {
    let headers = new HttpHeaders({
      'authentication': this.cookieService.get("token")});
    let params = new HttpParams()
      .set("province", provincia)
      .set("region", region)
      .set("municipality", municipio)
      .set("minCategory", categoriaMin.toString())
      .set("maxCategory", categoriaMax.toString())
      .set("page", page.toString());
    return this.http.get(this.urlApp + "/restaurants/search", {params:params, headers:headers});
  }

  public searchOficinasTurismo(provincia, region, page) {
    let headers = new HttpHeaders({
      'authentication': this.cookieService.get("token")});
    let params = new HttpParams()
      .set("province", provincia)
      .set("region", region)
      .set("page", page.toString());
    return this.http.get(this.urlApp + "/touristOffices/search", {params:params, headers:headers});
  }

  public searchPuntosInformacion(provincia, region, municipio, page) {
    let headers = new HttpHeaders({
      'authentication': this.cookieService.get("token")});
    let params = new HttpParams()
      .set("province", provincia)
      .set("region", region)
      .set("municipality", municipio)
      .set("page", page.toString());
    return this.http.get(this.urlApp + "/informationPoints/search", {params:params, headers:headers});
  }

  public searchGuias(idioma, page) {
    let headers = new HttpHeaders({
      'authentication': this.cookieService.get("token")});
    let params = new HttpParams()
      .set("idiom", idioma)
      .set("page", page.toString());
    return this.http.get(this.urlApp + "/guides/search", {params:params, headers:headers});
  }

  public parser(tipo: string) {
    let headers = new HttpHeaders({
      'authentication': this.cookieService.get("token")});
    return this.http.post(this.urlApp + "/parserData/" + tipo, null,{headers:headers});
  }

}
