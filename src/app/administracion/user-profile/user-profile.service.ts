import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BASE_URL_SERVICE } from '../../constants';
import { User } from '../../models/user';

@Injectable()
export class UserProfileService {

  private URL = BASE_URL_SERVICE + '/Users';

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



}
