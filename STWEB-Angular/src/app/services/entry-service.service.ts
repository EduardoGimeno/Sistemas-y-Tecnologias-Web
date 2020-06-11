import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private urlApp: string = "https://back-turismoaragon.herokuapp.com";

  constructor(private http: HttpClient) { }

  getCount(tipo: string) {
    return this.http.get(this.urlApp + "/" + tipo + "/count");
  }

  public getHoteles(page: number) {
    let params = new HttpParams()
      .set("page", page.toString());
    return this.http.get(this.urlApp + "/hotels", {params:params});
  }

  public getTurismosRurales(page: number) {
    let params = new HttpParams()
      .set("page", page.toString());
    return this.http.get(this.urlApp + "/ruralHouses", {params:params});
  }

  public getApartamentos(page: number) {
    let params = new HttpParams()
      .set("page", page.toString());
    return this.http.get(this.urlApp + "/apartments", {params:params});
  }

  public getCampings(page: number) {
    let params = new HttpParams()
      .set("page", page.toString());
    return this.http.get(this.urlApp + "/campings", {params:params});
  }

  public getRefugios(page: number) {
    let params = new HttpParams()
      .set("page", page.toString());
    return this.http.get(this.urlApp + "/shelters", {params:params});
  }

  public getRestaurantes(page: number) {
    let params = new HttpParams()
      .set("page", page.toString());
    return this.http.get(this.urlApp + "/restaurants", {params:params});
  }

  public getOficinasTurismo(page: number) {
    let params = new HttpParams()
      .set("page", page.toString());
    return this.http.get(this.urlApp + "/touristOffices", {params:params});
  }

  public getPuntosInformacion(page: number) {
    let params = new HttpParams()
      .set("page", page.toString());
    return this.http.get(this.urlApp + "/informationPoints", {params:params});
  }

  public getGuias(page: number) {
    let params = new HttpParams()
      .set("page", page.toString());
    return this.http.get(this.urlApp + "/guides", {params:params});
  }

  public getHotel(id) {
    let params = new HttpParams()
      .set("id", id.toString());
    return this.http.get(this.urlApp + "/hotels/get", {params:params});
  }

  public getTurismoRural(id) {
    let params = new HttpParams()
      .set("id", id.toString());
    return this.http.get(this.urlApp + "/ruralHouses/get", {params:params});
  }

  public getApartamento(id) {
    let params = new HttpParams()
      .set("id", id.toString());
    return this.http.get(this.urlApp + "/apartments/get", {params:params});
  }

  public getCamping(id) {
    let params = new HttpParams()
      .set("id", id.toString());
    return this.http.get(this.urlApp + "/campings/get", {params:params});
  }

  public getRefugio(id) {
    let params = new HttpParams()
      .set("id", id.toString());
    return this.http.get(this.urlApp + "/shelters/get", {params:params});
  }

  public getRestaurante(id) {
    let params = new HttpParams()
      .set("id", id.toString());
    return this.http.get(this.urlApp + "/restaurants/get", {params:params});
  }

  public getOficinaTurismo(id) {
    let params = new HttpParams()
      .set("id", id.toString());
    return this.http.get(this.urlApp + "/touristOffices/get", {params:params});
  }

  public getPuntoInformacion(id) {
    let params = new HttpParams()
      .set("id", id.toString());
    return this.http.get(this.urlApp + "/informationPoints/get", {params:params});
  }

  public getGuia(id) {
    let params = new HttpParams()
      .set("id", id.toString());
    return this.http.get(this.urlApp + "/guides/get", {params:params});
  }

  public searchHoteles(provincia, region, municipio, estrellasMin, estrellasMax, page) {
    let params = new HttpParams()
      .set("province", provincia)
      .set("region", region)
      .set("municipality", municipio)
      .set("minStars", estrellasMin.toString())
      .set("maxStars", estrellasMax.toString())
      .set("page", page.toString());
    return this.http.get(this.urlApp + "/hotels/search", {params:params});
  }

  public searchTurismoRurales(provincia, region, municipio, espigasMin, espigasMax, page) {
    let params = new HttpParams()
      .set("province", provincia)
      .set("region", region)
      .set("municipality", municipio)
      .set("minSpikes", espigasMin.toString())
      .set("maxSpikes", espigasMax.toString())
      .set("page", page.toString());
    return this.http.get(this.urlApp + "/ruralHouses/search", {params:params});
  }

  public searchApartamentos(provincia, region, municipio, page) {
    let params = new HttpParams()
      .set("province", provincia)
      .set("region", region)
      .set("municipality", municipio)
      .set("page", page.toString());
    return this.http.get(this.urlApp + "/apartments/search", {params:params});
  }

  public searchCampings(provincia, region, municipio, page) {
    let params = new HttpParams()
      .set("province", provincia)
      .set("region", region)
      .set("municipality", municipio)
      .set("page", page.toString());
    return this.http.get(this.urlApp + "/campings/search", {params:params});
  }

  public searchRefugios(provincia, region, municipio, page) {
    let params = new HttpParams()
      .set("province", provincia)
      .set("region", region)
      .set("municipality", municipio)
      .set("page", page.toString());
    return this.http.get(this.urlApp + "/shelters/search", {params:params});
  }

  public searchRestaurantes(provincia, region, municipio, categoriaMin, categoriaMax, page) {
    let params = new HttpParams()
      .set("province", provincia)
      .set("region", region)
      .set("municipality", municipio)
      .set("minCategory", categoriaMin.toString())
      .set("maxCategory", categoriaMax.toString())
      .set("page", page.toString());
    return this.http.get(this.urlApp + "/restaurants/search", {params:params});
  }

  public searchOficinasTurismo(provincia, region, page) {
    let params = new HttpParams()
      .set("province", provincia)
      .set("region", region)
      .set("page", page.toString());
    return this.http.get(this.urlApp + "/touristOffices/search", {params:params});
  }

  public searchPuntosInformacion(provincia, region, municipio, page) {
    let params = new HttpParams()
      .set("province", provincia)
      .set("region", region)
      .set("municipality", municipio)
      .set("page", page.toString());
    return this.http.get(this.urlApp + "/informationPoints/search", {params:params});
  }

  public searchGuias(idioma, page) {
    let params = new HttpParams()
      .set("idiom", idioma)
      .set("page", page.toString());
    return this.http.get(this.urlApp + "/guides/search", {params:params});
  }

}
