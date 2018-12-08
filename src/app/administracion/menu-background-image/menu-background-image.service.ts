import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BASE_URL_SERVICE } from '../../constants';
import { User } from '../../models/user';


@Injectable()
export class MenuBackgroundImageService {

  private URL = BASE_URL_SERVICE + '/';

  constructor(private http: HttpClient) { }

  postFormImage(body) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/form-data');
    return this.http.post(this.URL, body, {headers: headers })
  }

}
