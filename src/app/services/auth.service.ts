import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { map} from 'rxjs/operators';

@Injectable()
export class AuthService {
  user: any;

  constructor(private http: Http) { }

    loggingData(user) {
    this.user = user;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const url = 'http://localhost:3000/login';
    return this.http.post(url, this.user, { headers: headers}).pipe(map(res => res.json()));
    }
}


