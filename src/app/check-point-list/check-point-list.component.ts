import { Component, OnInit } from '@angular/core';
import { CheckPointService } from '../services/check-point.service';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-check-point-list',
  templateUrl: './check-point-list.component.html',
  styleUrls: ['./check-point-list.component.scss']
})
export class CheckPointListComponent implements OnInit {
  allCheckPoints: any[];
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

  ngOnInit() {
    this.getCheckPoints.getAllCheckPoints().subscribe(result=>{
      this.allCheckPoints = result;
    });
    console.log(this.allCheckPoints);
  }

}

@Component({
  selector: 'add-check-point-popup',
  templateUrl: 'add-check-point-popup.html',
})
export class AddCheckPointPopup {
  constructor(
    //private updVehicles:VehicleServiceService,
  ) { };
  addCheckPoint(){
    // this.delVehicles.deleteVehicle(vId).subscribe(res=>{
    //   console.log(res);
    // });
  }
}
