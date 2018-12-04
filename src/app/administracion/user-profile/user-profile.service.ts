import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BASE_URL_SERVICE } from '../../constants';
import { User } from '../../models/user';

@Injectable()
export class UserProfileService {

  private URL = BASE_URL_SERVICE + '/Users';
  private URL_IMAGE = BASE_URL_SERVICE + '/UploadImage';

  constructor(private http: HttpClient) { }

  getUsuarioById(id_usuario_kiosko: number): Observable<any> {
    return this.http.get<any>(this.URL + '?action=getUsuarioById&id_usuario='+id_usuario_kiosko+'&id_usuario_kiosko=' + id_usuario_kiosko);
  }

  updateUser(id_usuario:number, usuario:User): Observable<any>{
    let datos: any = { usuario };
    const body = new HttpParams()
    .set('action', 'updateUser')
    .set('data', ''+JSON.stringify(datos))
    .set('id_usuario', ""+id_usuario);
    return this.http.post(this.URL,body);
  }

  changePassword(id_usuario:number, password_actual: string, new_password: string): Observable<any>{
    const body = new HttpParams()
    .set('action', 'changePassword')
    .set('password_actual', ''+password_actual)
    .set('new_password', ''+new_password)
    .set('id_acceso',''+id_usuario)
    .set('id_usuario', ''+id_usuario);
    return this.http.post(this.URL,body);
  }

  uploadImage(id_usuario:number, image_base64:string, object: string, id:number): Observable<any>{

    const body = new HttpParams()
    .set('action', 'uploadImage')
    .set('file', ''+image_base64 )
    .set('object', object )
    .set('id', ""+ id )
    .set('id_usuario', ""+id_usuario);
    return this.http.post(this.URL_IMAGE,body);
  }

  getImage(id_usuario_kiosko: number, nombre_image:string): Observable<any> {
    return this.http.get<any>(this.URL_IMAGE + '?action=getImage&nombre_image=' + nombre_image+'&id_usuario='+id_usuario_kiosko);
  }



}
