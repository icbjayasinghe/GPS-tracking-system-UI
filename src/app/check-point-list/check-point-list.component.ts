import { Component, OnInit } from '@angular/core';
import { CheckPointService } from '../services/check-point.service';
import {MatDialog} from '@angular/material';

var cpId;

@Component({
  selector: 'app-check-point-list',
  templateUrl: './check-point-list.component.html',
  styleUrls: ['./check-point-list.component.scss']
})
export class CheckPointListComponent implements OnInit {
  allCheckPoints: any[];
  interval: any;
  constructor(
    public dialog:MatDialog,
    private getCheckPoints:CheckPointService
  ) { }

  openDialog() {
    const dialogRef = this.dialog.open(AddCheckPointPopup,{
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  };

  deleteConfirmDialog(checkPointId){
    const dialogRef = this.dialog.open(DeleteCheckPointPopup,{
      height: '350px',
      width: '400px',
    });
    cpId=checkPointId;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  };

  ngOnInit() {
    this.getCheckPoints.getAllCheckPoints().subscribe(result=>{
      this.allCheckPoints = result;
    });
    this.interval = setInterval(() => { 
      this.getCheckPoints.getAllCheckPoints().subscribe(result=>{
        this.allCheckPoints = result;
      });
    }, 1000);
  }
}

@Component({
  selector: 'add-check-point-popup',
  templateUrl: 'add-check-point-popup.html',
})
export class AddCheckPointPopup {
  userId : String ;
  locationName : String ;
  locationType : String ;
  latitude : String ;
  longitude : String ;
  constructor(
    private addNewCheckPoints:CheckPointService,
  ) { };
  addCheckPoint(){
    const checkPointObj = { 
      userId:this.userId,
      locationName:this.locationName,
	    locationType:this.locationType,
      latitude:this.latitude,
      longitude:this.longitude
    }
    this.addNewCheckPoints.addNewCheckPoint(checkPointObj).subscribe(res=>{
      console.log(res);
    });
  };
}

@Component({
  selector: 'delete-check-point-popup',
  templateUrl: 'delete-check-point-popup.html',
})
export class DeleteCheckPointPopup {
  constructor(
    private delCheckPoint:CheckPointService,
  ) { };
  deleteCheckPoint(){
    this.delCheckPoint.deleteCheckPoint(cpId).subscribe(res=>{
      console.log(res);
    });
  }
}