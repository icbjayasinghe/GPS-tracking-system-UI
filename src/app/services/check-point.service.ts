import { Injectable } from '@angular/core';
import { Http,Headers} from '@angular/http';
import { map} from 'rxjs/operators';

@Injectable()
export class CheckPointService {

  constructor(
    private http:Http,
  ) { }

  getAllCheckPoints(){
    const url = "http://localhost:3000/checkpoint"
    return this.http.get(url).pipe(map(res=>res.json()));
  }

  addNewCheckPoint(checkPointObj){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    const url ="http://localhost:3000/checkpoint";
    return this.http.post(url,checkPointObj,{headers:headers}).pipe(map(res=>res.json()));
  }

  deleteCheckPoint(cpId){
    console.log(cpId);
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    const url ="http://localhost:3000/checkpoint/"+cpId;
    return this.http.delete(url).pipe(map(res=>res.json()));
  }
}
