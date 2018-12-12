import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BASE_URL_SERVICE } from '../../constants';
import { Injectable } from '@angular/core';
import { Imagen } from '../../models/imagen';

@Injectable()
export class FormBackgroundImageService {

  private URL = BASE_URL_SERVICE + '/UploadProtectorPantalla';

  constructor(private http: HttpClient) { }

  getImageById(id_usuario: number, id_imagen: number): Observable<any> {
    return this.http.get<any>(this.URL + '?action=getProtectorPantalla&id_usuario=' + id_usuario + '&id_imagen=' + id_imagen);
  }

  insertImage(formulario:FormData): Observable<any>{ 
    return this.http.post(this.URL,formulario);
  }

  updateDatosProtectorPantalla(id_usuario:number, nombre: string, descripcion: string, id_imagen: number): Observable<any>{
    const body = new HttpParams()
    .set('action', 'updateDatosProtectorPantalla')
    .set('nombre', nombre)
    .set('descripcion', descripcion)
    .set('id_imagen', ""+id_imagen)
    .set('id_usuario_modifica_registro', ""+id_usuario)
    .set('id_usuario', ""+id_usuario);
    return this.http.post(this.URL,body);
  }

  
  updateImagen(formulario:FormData): Observable<any>{ 
    return this.http.post(this.URL,formulario);
  }


}
