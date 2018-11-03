import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { map} from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class MapService {
  authToken: any;

  constructor( private http: Http,
               private auth: AuthService) {}

  private loadToken() {
    this.authToken = localStorage.getItem('token');
  }
  getTrackingData() {
      const headers = new Headers();
      this.auth.fetchToken();
      headers.append('Authorization', this.auth.token);
      headers.append('Content-Type', 'application/json');
      let url = 'http://localhost:3000/api/vehicle/' + this.auth.profile._id;
      if (this.auth.findUser()) {
        url = 'http://localhost:3000/api/vehicle';
      }
      return this.http.get(url, {headers: headers}).pipe(map(res => res.json()));
  }
}
