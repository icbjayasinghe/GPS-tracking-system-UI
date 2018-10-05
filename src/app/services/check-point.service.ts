import { Injectable } from '@angular/core';
import { Http,Headers} from '@angular/http';
import { map} from 'rxjs/operators';

@Injectable()
export class CheckPointService {

  constructor(
    private http:Http,
  ) { }

  getAllCheckPoints(){
    const url = "http://localhost:3000/CheckPoint"
    return this.http.get(url).pipe(map(res=>res.json()));
  }

}
