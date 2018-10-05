import { Injectable } from '@angular/core';
import { Http,Headers} from '@angular/http';
import { map} from 'rxjs/operators';

@Injectable()
export class VehicleServiceService {

  constructor(
    private http:Http,
  ) { }

  getAllVehicles(){
    const url = "http://localhost:3000/viewVehicles"
    return this.http.get(url).pipe(map(res=>res.json()));
  }

  addNewVehicle(vehiObj){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    const url ="http://localhost:3000/addVehicle";
    return this.http.post(url,vehiObj,{headers:headers}).pipe(map(res=>res.json()));
    //return "hello";
  }

}
