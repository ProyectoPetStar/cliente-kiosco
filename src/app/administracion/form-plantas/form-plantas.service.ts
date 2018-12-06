import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BASE_URL_SERVICE } from '../../constants';
import { Injectable } from '@angular/core';
import { Plantas } from '../../models/plantas';

@Injectable()
export class FormPlantasService {

  private URL = BASE_URL_SERVICE + '/CatalogoPlanta';
  private URL_IMAGE = BASE_URL_SERVICE + '/UploadImage';
  

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

  uploadImage(id_usuario:number, image_base64:any, object: string, id:number): Observable<any>{

    const body = new HttpParams()
    .set('action', 'uploadImage')
    .set('file', image_base64 )
    .set('object', object )
    .set('id', ""+ id )
    .set('id_usuario', ""+id_usuario);
    return this.http.post(this.URL_IMAGE,body);
  }

  getImage(id_usuario_kiosko: number, nombre_image:string): Observable<any> {
    return this.http.get<any>(this.URL + '?action=getImage&nombre_image=' + nombre_image+'&id_usuario='+id_usuario_kiosko);
  }



}
