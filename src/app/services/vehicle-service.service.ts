import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { map} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable()
export class VehicleServiceService {

  constructor(
    private http: Http,
    private auth: AuthService
  ) { }

  getAllVehicles() {
      const headers = new Headers();
      this.auth.fetchToken();
      headers.append('Authorization', this.auth.token);
      headers.append('Content-Type', 'application/json');
    const url = 'http://localhost:3000/api/vehicle';
    return this.http.get(url, {headers: headers}).pipe(map(res => res.json()));
  }

  addNewVehicle(vehiObj){
    const headers = new Headers();
    this.auth.fetchToken();
    headers.append('Authorization', this.auth.token);
    headers.append('Content-Type', 'application/json');
    const url = 'http://localhost:3000/api/vehicle';
    return this.http.post(url, vehiObj, {headers: headers}).pipe(map(res => res.json()));
  }

  deleteVehicle(vehiId){
    const headers = new Headers();
    this.auth.fetchToken();
    headers.append('Authorization', this.auth.token);
    headers.append('Content-Type', 'application/json');
    const url = 'http://localhost:3000/api/vehicle/' + vehiId;
    return this.http.delete(url, {headers: headers}).pipe(map(res => res.json()));
  }

  updateVehicle(vehiId,vehiObj){
    const headers = new Headers();
    this.auth.fetchToken();
    headers.append('Authorization', this.auth.token);
    headers.append('Content-Type', 'application/json');
    const url = 'http://localhost:3000/api/vehicle/' + vehiId;
    return this.http.put(url, vehiObj, {headers: headers}).pipe(map(res => res.json()));
  }

}
