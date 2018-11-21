import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { map} from 'rxjs/operators';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';

@Injectable()
export class MapService {
  authToken: any;

  constructor( private http: Http,
               private auth: AuthService) {}

  private loadToken() {
    this.authToken = localStorage.getItem('token');
  }
  getTrackingData(vehicle: any) {
      const headers = new Headers();
      this.auth.fetchToken();
      headers.append('Authorization', this.auth.token);
      headers.append('Content-Type', 'application/json');
      let url = 'http://localhost:3000/api/vehicle/getTrackingData/' + JSON.parse(localStorage.getItem('user'))._id + '/' + vehicle;
      if (this.auth.findUser()) {
          url = 'http://localhost:3000/api/vehicle/getTrackingData/' + vehicle;
      }
      return this.http.get(url, {headers: headers}).pipe(map(res => res.json()));
  }


    getVehiclesCurrentLocation() {
        const headers = new Headers();
        this.auth.fetchToken();
        headers.append('Authorization', this.auth.token);
        headers.append('Content-Type', 'application/json');
        let url = 'http://localhost:3000/api/vehicle/' + JSON.parse(localStorage.getItem('user'))._id;
        if (this.auth.findUser()) {
            url = 'http://localhost:3000/api/vehicle';
        }
        return this.http.get(url, {headers: headers}).pipe(map(res => res.json()));
    }

  getVehicleHistory(historyObj: any) {
      const headers = new Headers();
      this.auth.fetchToken();
      headers.append('Authorization', this.auth.token);
      headers.append('Content-Type', 'application/json');
      const url = 'http://localhost:3000/api/searchHistory';
      return this.http.post(url, historyObj, {headers: headers}).pipe(map(res => res.json()));
  }
}
