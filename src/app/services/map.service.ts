import { Injectable } from '@angular/core';
import { Http,Headers} from '@angular/http';
import { map} from 'rxjs/operators';

@Injectable()
export class MapService {

  constructor(
    private http:Http,
  ) { 
  }

  getTrackingData(){
    const url = "http://localhost:3000/api/vehicle"
    return this.http.get(url).pipe(map(res=>res.json()));
  }
}
