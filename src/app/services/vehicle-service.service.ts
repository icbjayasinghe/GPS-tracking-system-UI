import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { map} from 'rxjs/operators';
import {AuthService} from './auth.service';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';


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
      let url = 'http://10.10.1.191:3000/api/vehicle/' + JSON.parse(localStorage.getItem('user'))._id;
      if (this.auth.findUser()) {
          url = 'http://10.10.1.191:3000/api/vehicle/vehicleDetailsWithUserName';
      }
    return this.http.get(url, {headers: headers}).pipe(map(res => res.json()));
  }

  addNewVehicle(vehiObj){
    const headers = new Headers();
    this.auth.fetchToken();
    headers.append('Authorization', this.auth.token);
    headers.append('Content-Type', 'application/json');
    const url = 'http://10.10.1.191:3000/api/vehicle';
    return this.http.post(url, vehiObj, {headers: headers}).pipe(map(res => res.json()));
  }

  deleteVehicle(vehiId){
    const headers = new Headers();
    this.auth.fetchToken();
    headers.append('Authorization', this.auth.token);
    headers.append('Content-Type', 'application/json');
    const url = 'http://10.10.1.191:3000/api/vehicle/' + vehiId;
    return this.http.delete(url, {headers: headers}).pipe(map(res => res.json()));
  }

  updateVehicle(vehiId, vehiObj) {
    const headers = new Headers();
    this.auth.fetchToken();
    headers.append('Authorization', this.auth.token);
    headers.append('Content-Type', 'application/json');
    const url = 'http://10.10.1.191:3000/api/vehicle/' + vehiId;
    return this.http.put(url, vehiObj, {headers: headers}).pipe(map(res => res.json()));
  }

    getVehicleList() {
        const headers = new Headers();
        this.auth.fetchToken();
        headers.append('Authorization', this.auth.token);
        headers.append('Content-Type', 'application/json');

        let url = 'http://10.10.1.191:3000/api/vehicle/vehicleNumberByUser/' + JSON.parse(localStorage.getItem('user'))._id;
        if (this.auth.findUser()) {
            url = 'http://10.10.1.191:3000/api/vehicle/getVehicleNumbers';
        }
        return this.http.get(url, {headers: headers}).pipe(map(res => res.json()));
    }

    requestSummary(date) {
        const headers = new Headers();
        this.auth.fetchToken();
        headers.append('Authorization', this.auth.token);
        headers.append('Content-Type', 'application/json');

        let url = 'http://localhost:3000/api/summaryByUser/' + JSON.parse(localStorage.getItem('user'))._id + '/' + date;
        if (this.auth.findUser()) {
            url = 'http://localhost:3000/api/summary/' + date;
        }
        return this.http.get(url, {headers: headers}).pipe(map(res => res.json()));
    }

    requestReport(vehicleNumber, date) {
        const headers = new Headers();
        this.auth.fetchToken();
        headers.append('Authorization', this.auth.token);
        headers.append('Content-Type', 'application/json');

        let url = 'http://localhost:3000/api/historyReports/' + vehicleNumber + '/' + date;
        url = encodeURI(url);
        return this.http.get(url, {headers: headers}).pipe(map(res => res.json()));
    }

}
