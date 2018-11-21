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
  

}
