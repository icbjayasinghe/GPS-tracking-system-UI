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
export class DialogContentExampleDialog {}

