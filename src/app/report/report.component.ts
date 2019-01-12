import { Component, OnInit } from '@angular/core';
import {VehicleServiceService} from '../services/vehicle-service.service';
import {FormControl} from '@angular/forms';
import {MatDatepicker} from '@angular/material/datepicker';
import {MatDialog} from '@angular/material';
import {AuthService} from '../services/auth.service';
import {DataService} from '../services/data.service';
import {m} from '@angular/core/src/render3';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
    protected vehicleNumber: String;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }


    requestReport() {
        const dialogRef = this.dialog.open(VehicleReportPopupComponent, {
            height: '400px',
            width: '600px',
        }, );

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

}


@Component({
    selector: 'vehicle-report-popup',
    templateUrl: 'vehicle-report-popup.html'
})
export class VehicleReportPopupComponent implements OnInit{

    protected allVehiclesResult: any;
    protected vehicleNumber: string;
    protected selectDate: string;

    constructor(
        private auth: AuthService,
        private data: DataService,
        public vehicles: VehicleServiceService
    ) { };


    ngOnInit() {
        this.vehicles.getVehicleList().subscribe(result => {
            this.getUserVehicles(result);
        });
    }

    getUserVehicles(result) {
        this.allVehiclesResult = result;
    }

    requestReport() {
        const date = new Date(this.selectDate);
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const day = date.getDate();
        this.selectDate = year + '-' + month + '-' + day;
        console.log(this.selectDate);
    }
}
