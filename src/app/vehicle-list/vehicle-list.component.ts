import { Component, OnInit } from '@angular/core';
import { VehicleServiceService} from '../services/vehicle-service.service';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {
  allVehicles: any[];
  constructor(
    private getVehicles:VehicleServiceService,
    public dialog: MatDialog
  ) { };

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  };

  ngOnInit() {
    this.getVehicles.getAllVehicles().subscribe(result=>{
      this.allVehicles = result;
    });
  }

}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {
  vehicleNo: String;
  deviceImei: String;
  userName: String;
  vehicleDetails: String;

  constructor(
    private addNewVehicles:VehicleServiceService,
  ) { };

  addVehicle(){
    const vehicleObj = { 
      vehicleNo:this.vehicleNo,
	    Imie:this.deviceImei,
	    userName:this.userName,
	    details:this.vehicleDetails
    }
    this.addNewVehicles.addNewVehicle(vehicleObj).subscribe(res=>{
      console.log(res);
    });
  };
}

