import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BASE_URL_SERVICE } from '../../constants';
import { Injectable } from '@angular/core';
import { Imagen } from '../../models/imagen';

@Injectable()
export class FormBackgroundImageService {

  private URL = BASE_URL_SERVICE + '/';

  constructor(private http: HttpClient) { }

  getImageById(id_usuario: number, id_imagen: number): Observable<any> {
    return this.http.get<any>(this.URL + '?action=ejemplo&id_usuario=' + id_usuario + '&id_imagen=' + id_imagen);
  }

  insertImage(id_usuario:number, imageForm:FormData): Observable<any>{
  
    const body = new HttpParams()
    .set('action', '')
    .set('id_usuario', ""+id_usuario);
    
    return this.http.post(this.URL,body);
  }


}
