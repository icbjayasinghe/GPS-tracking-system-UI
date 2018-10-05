import { Component, OnInit } from '@angular/core';
import { CheckPointService } from '../services/check-point.service';

@Component({
  selector: 'app-check-point-list',
  templateUrl: './check-point-list.component.html',
  styleUrls: ['./check-point-list.component.scss']
})
export class CheckPointListComponent implements OnInit {
  allCheckPoints: any[];

  constructor(
    private getCheckPoints:CheckPointService
  ) { }

  ngOnInit() {
    console.log(this.getCheckPoints.getAllCheckPoints().subscribe(result=>{
      this.allCheckPoints = result;
    }));
  }

}
