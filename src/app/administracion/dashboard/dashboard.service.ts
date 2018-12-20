import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BASE_URL_SERVICE } from '../../constants';

@Injectable()
export class DashboardService {

  private URL = BASE_URL_SERVICE + '/Reportes';

  constructor(private http: HttpClient) { }

  conteoKiosco(id_usuario: number): Observable<any> {
    return this.http.get<any>(this.URL + '?action=conteoKiosco&id_usuario=' + id_usuario);
  }

}
