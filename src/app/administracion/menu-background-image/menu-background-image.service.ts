import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BASE_URL_SERVICE } from '../../constants';



@Injectable()
export class MenuBackgroundImageService {

  private URL = BASE_URL_SERVICE + '/UploadProtectorPantalla';

  constructor(private http: HttpClient) { }

  getAllImagen(id_usuario_kiosko: number): Observable<any> {
    return this.http.get<any>(this.URL + '?action=getAllImagen&id_usuario=' + id_usuario_kiosko);
  }

  activeWallpaper(id_usuario: number, id_imagen: number): Observable<any> {
    const body = new HttpParams()
      .set('action', 'activeWallpaper')
      .set('id_imagen', '' + id_imagen)
      .set('id_usuario', '' + id_usuario);
    return this.http.post(this.URL, body);
  }



}
