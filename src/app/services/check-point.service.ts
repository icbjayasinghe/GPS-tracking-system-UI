import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { map} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable()
export class CheckPointService {

  constructor(
    private http: Http,
    private auth: AuthService
  ) { }

  getAllCheckPoints(userName) {
    const headers = new Headers();
    this.auth.fetchToken();
    headers.append('Authorization', this.auth.token);
    headers.append('Content-Type', 'application/json');
    const url = 'http://123.231.52.227/api/user/location/' + userName;
    return this.http.get(url, {headers: headers}).pipe(map(res => res.json()));
  }

  addNewCheckPoint(checkPointObj) {
    const headers = new Headers();
      this.auth.fetchToken();
      headers.append('Authorization', this.auth.token);
      headers.append('Content-Type', 'application/json');
    const url = 'http://123.231.52.227/api/user/location';
    return this.http.put(url, checkPointObj, {headers: headers}).pipe(map(res => res.json()));
  }

  deleteCheckPoint(checkPointDetails) {
    const headers = new Headers();
    this.auth.fetchToken();
    headers.append('Authorization', this.auth.token);
    headers.append('Content-Type', 'application/json');
    const url = 'http://123.231.52.227/api/user/removeLocation';
    return this.http.post(url, checkPointDetails, {headers: headers}).pipe(map(res => res.json()));
  }
}
