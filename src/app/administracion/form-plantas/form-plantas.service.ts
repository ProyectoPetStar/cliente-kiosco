import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BASE_URL_SERVICE } from '../../constants';
import { Injectable } from '@angular/core';
import { Plantas } from '../../models/plantas';

@Injectable()
export class FormPlantasService {

  private URL = BASE_URL_SERVICE + '/CatalogoPlanta';

  constructor(private http: HttpClient) { }

  getAllPlantaById(id_usuario: number, id_planta: number): Observable<any> {
    return this.http.get<any>(this.URL + '?action=getAllPlantaById&id_usuario=' + id_usuario + '&id_planta=' + id_planta);
  }

  updateCatalogoPlanta(id_usuario:number, planta:Plantas): Observable<any>{
    let datos: any = { planta };
    const body = new HttpParams()
    .set('action', 'updateCatalogoPlanta')
    .set('data', ''+JSON.stringify(datos))
    .set('id_usuario', ""+id_usuario);
    return this.http.post(this.URL,body);
  }


  insertCatalogoPlanta(id_usuario:number, planta:Plantas): Observable<any>{
    let datos: any = { planta };
    const body = new HttpParams()
    .set('action', 'insertCatalogoPlanta')
    .set('data', ''+JSON.stringify(datos))
    .set('id_usuario', ""+id_usuario);
    return this.http.post(this.URL,body);
  }



}
