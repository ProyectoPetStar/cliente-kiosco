import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BASE_URL_SERVICE } from '../../constants';
import { Injectable } from '@angular/core';
import { App } from '../../models/app';

@Injectable()
export class FormAppWebService {

  private URL = BASE_URL_SERVICE + '/UrlKioscos';

  constructor(private http: HttpClient) { }

  getUrlKioscoById(id_usuario: number, id_url_kiosco: number): Observable<any> {
    return this.http.get<any>(this.URL + '?action=getUrlKioscoById&id_usuario=' + id_usuario + '&id_url_kiosco=' + id_url_kiosco);
  }

  updateUrlKiosco(id_usuario:number, app:App): Observable<any>{
    let datos: any = { app };
    const body = new HttpParams()
    .set('action', 'updateUrlKiosco')
    .set('data', ''+JSON.stringify(datos))
    .set('id_usuario', ""+id_usuario);
    return this.http.post(this.URL,body);
  }


  insertUrlKioscos(id_usuario:number, app:App): Observable<any>{
    let datos: any = { app };
    const body = new HttpParams()
    .set('action', 'insertUrlKioscos')
    .set('data', ''+JSON.stringify(datos))
    .set('id_usuario', ""+id_usuario);
    return this.http.post(this.URL,body);
  }

}
