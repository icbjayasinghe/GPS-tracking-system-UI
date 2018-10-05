import { Component, OnInit } from '@angular/core';
import { VehicleServiceService} from '../services/vehicle-service.service';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {
  interval: any;
  allVehicles: any[];
  constructor(
    private getVehicles:VehicleServiceService,
    public dialog: MatDialog
  ) { };

  openDialog() {
    const dialogRef = this.dialog.open(AddVehiclePopup,{
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  };

  deleteConfirmDialog(){
    const dialogRef = this.dialog.open(DeleteVehiclePopup,{
      height: '350px',
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  };

  ngOnInit() {
    this.getVehicles.getAllVehicles().subscribe(result=>{
      this.allVehicles = result;
    });
    this.interval = setInterval(() => { 
      this.getVehicles.getAllVehicles().subscribe(result=>{
        this.allVehicles = result;
      });
    }, 1000);
  }
}

@Component({
  selector: 'add-vehicle-popup',
  templateUrl: 'add-vehicle-popup.html',
})
export class AddVehiclePopup {
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

@Component({
  selector: 'delete-vehicle-popup',
  templateUrl: 'delete-vehicle-popup.html',
})
export class DeleteVehiclePopup {}

