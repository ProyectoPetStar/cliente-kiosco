import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BASE_URL_SERVICE } from '../../constants';
import { Injectable } from '@angular/core';

@Injectable()
export class FormPlantasService {

  private URL = BASE_URL_SERVICE + '/CatalogoPlanta';

  constructor(private http: HttpClient) { }

  getAllPlantaById(id_usuario: number, id_planta: number): Observable<any> {
    return this.http.get<any>(this.URL + '?action=getAllPlantaById&id_usuario=' + id_usuario + '&id_planta=' + id_planta);
  }

}
