import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BASE_URL_SERVICE } from '../../constants';
import { Imagen } from '../../models/imagen';



@Injectable()
export class MenuBackgroundImageService {

  private URL = BASE_URL_SERVICE + '/UploadProtectorPantalla';

  constructor(private http: HttpClient) { }

  getAllImagen(id_usuario_kiosko: number): Observable<any> {
    return this.http.get<any>(this.URL + '?action=getAllImagen&id_usuario=' + id_usuario_kiosko);
  }

  seleccionImagen(id_usuario: number, id_imagen: number, posicion: string): Observable<any> {
    const body = new HttpParams()
      .set('action', 'seleccionImagen')
      .set('id_imagen', '' + id_imagen)
      .set('posicion', posicion)
      .set('id_usuario_modifica_registro', '' + id_usuario)
      .set('id_usuario', '' + id_usuario);
    return this.http.post(this.URL, body);
  }

  cambiarStatus(id_usuario: number, wallpaper:Imagen): Observable<any>{
    const body = new HttpParams()
    .set('action', 'cambiarStatus')
    .set('id_imagen', '' + wallpaper.id_imagen)
    .set('id_usuario', '' + id_usuario);
  return this.http.post(this.URL, body);
    
  }



}
