import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BASE_URL_SERVICE } from '../../constants';
import { User } from '../../models/user';

@Injectable()
export class MenuAppWebService {

  private URL = BASE_URL_SERVICE + '/UrlKioscos';

  constructor(private http: HttpClient) { }

  getAllUrlKiosco(id_usuario_kiosko: number): Observable<any> {
    return this.http.get<any>(this.URL + '?action=getAllUrlKiosco&id_usuario='+id_usuario_kiosko);
  }

  deleteUrlKiosco(id_usuario: number, id_url_kiosko: number): Observable<any> {
    const body = new HttpParams()
      .set('action', 'deleteUrlKiosco')
      .set('id_url_kiosco', ''+id_url_kiosko)
      .set('id_usuario', "" + id_usuario);
    return this.http.post(this.URL, body);
  }




}
