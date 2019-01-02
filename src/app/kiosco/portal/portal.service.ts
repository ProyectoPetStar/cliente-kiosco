import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BASE_URL_SERVICE } from '../../constants';
import { App } from '../../models/app';

@Injectable()
export class PortalService {

  private URL = BASE_URL_SERVICE + '/UrlKioscos';
  private URL_CONTEO = BASE_URL_SERVICE + '/ConteoAcceso';

  constructor(private http: HttpClient) { }

  getStartKiosco(): Observable<any> {
    return this.http.get<any>(this.URL + '?action=getStartKiosco');
  }

  getAllApps(): Observable<any> {
    return this.http.get<any>(this.URL + '?action=getAllApps');
  }

  registrarAcceso(ip_privada: string, ip_publica: string, id_app:number): Observable<any> {
    const body = new HttpParams()
      .set('action', 'insertConteoAcceso')
      .set('ip_privada', ip_privada)
      .set('ip_publica', ip_publica)
      .set('id_url_kiosko', ''+id_app)    
    return this.http.post(this.URL_CONTEO, body);
  }



}
