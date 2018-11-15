import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BASE_URL_SERVICE } from '../../constants';

@Injectable()
export class UserProfileService {

  private URL = BASE_URL_SERVICE + '/Users';

  constructor(private http: HttpClient) { }

  getUsuarioById(id_usuario_kiosko: number): Observable<any> {
    return this.http.get<any>(this.URL + '?action=getUsuarioById&id_usuario='+id_usuario_kiosko+'&id_usuario_kiosko=' + id_usuario_kiosko);
  }

}
