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
    const url = 'http://10.10.1.8:80/api/user/location/' + userName;
    return this.http.get(url, {headers: headers}).pipe(map(res => res.json()));
  }

  addNewCheckPoint(checkPointObj, userName) {
    const headers = new Headers();
      this.auth.fetchToken();
      headers.append('Authorization', this.auth.token);
      headers.append('Content-Type', 'application/json');
    const url = 'http://10.10.1.8:80/api/user/location/' + userName;
    return this.http.put(url, checkPointObj, {headers: headers}).pipe(map(res => res.json()));
  }

  deleteCheckPoint(cpId) {
    const headers = new Headers();
    this.auth.fetchToken();
    headers.append('Authorization', this.auth.token);
    headers.append('Content-Type', 'application/json');
    const url = 'http://10.10.1.8:80/api/user/removeLocation/' + cpId;
    return this.http.delete(url, {headers: headers}).pipe(map(res => res.json()));
  }
}
