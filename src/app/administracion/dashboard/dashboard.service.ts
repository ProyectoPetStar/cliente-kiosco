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

  reporteByDia(id_usuario: number, paramsFind:any): Observable<any> {
    const body = new HttpParams()
      .set('action', 'reporteByDia')
      .set('id_kiosco', ''+paramsFind.id_kiosco)
      .set('id_planta', ''+paramsFind.id_planta)
      .set('fecha', paramsFind.fecha)
      .set('id_usuario', "" + id_usuario);
    return this.http.post(this.URL, body);
  }

  
  reporteByAplicacion(id_usuario: number, paramsFind:any): Observable<any> {
    const body = new HttpParams()
      .set('action', 'reporteByAplicacion')
      .set('id_kiosco', ''+paramsFind.id_kiosco)
      .set('id_planta', ''+paramsFind.id_planta)
      .set('fecha', paramsFind.fecha)
      .set('id_usuario', "" + id_usuario);
    return this.http.post(this.URL, body);
  }

}
