import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BASE_URL_SERVICE } from '../../constants';
import { App } from '../../models/app';

@Injectable()
export class PortalService {

  private URL = BASE_URL_SERVICE + '/UrlKioscos';

  constructor(private http: HttpClient) { }

  getAllApps(): Observable<any> {
    return this.http.get<any>(this.URL + '?action=getAllApps');
  }



}
