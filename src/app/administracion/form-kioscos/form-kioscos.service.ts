import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BASE_URL_SERVICE } from '../../constants';
import { Kiosco } from '../../models/kiosco';

@Injectable()
export class FormKioscosService {

  private URL = BASE_URL_SERVICE + '/Kiosco';

  constructor(private http: HttpClient) { }

  getKioscoById(id_usuario: number, id_kiosco: number): Observable<any> {
    return this.http.get<any>(this.URL + '?action=getKioscoById&id_usuario=' + id_usuario + '&id_kiosco=' + id_kiosco);
  }

  updateKiosco(id_usuario: number, kiosco: Kiosco): Observable<any> {
    let datos: any = { kiosco };
    const body = new HttpParams()
      .set('action', 'updateKiosco')
      .set('data', '' + JSON.stringify(datos))
      .set('id_usuario', "" + id_usuario);
    return this.http.post(this.URL, body);
  }


  insertKiosco(id_usuario: number, kiosco: Kiosco): Observable<any> {
    let datos: any = { kiosco };
    const body = new HttpParams()
      .set('action', 'insertKiosco')
      .set('data', '' + JSON.stringify(datos))
      .set('id_usuario', "" + id_usuario);
    return this.http.post(this.URL, body);
  }


}
