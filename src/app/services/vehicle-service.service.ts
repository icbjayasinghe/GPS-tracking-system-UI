import { Injectable } from '@angular/core';
import { Http,Headers} from '@angular/http';
import { map} from 'rxjs/operators';

@Injectable()
export class VehicleServiceService {

  constructor(
    private http:Http,
  ) { }

  getAllVehicles(){
    const url = "http://localhost:3000/api/vehicle"
    return this.http.get(url).pipe(map(res=>res.json()));
  }

  addNewVehicle(vehiObj){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    const url ="http://localhost:3000/api/vehicle";
    return this.http.post(url,vehiObj,{headers:headers}).pipe(map(res=>res.json()));
  }

  deleteVehicle(vehiId){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    const url ="http://localhost:3000/api/vehicle/"+vehiId;
    return this.http.delete(url).pipe(map(res=>res.json()));
  }

  updateVehicle(vehiId,vehiObj){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    const url ="http://localhost:3000/api/vehicle/"+vehiId;
    return this.http.put(url,vehiObj,{headers:headers}).pipe(map(res=>res.json()));
  }

}
