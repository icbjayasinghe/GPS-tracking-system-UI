import { Component, OnInit } from '@angular/core';
import {VehicleServiceService} from '../services/vehicle-service.service';
import {FormControl} from '@angular/forms';
import {MatDatepicker} from '@angular/material/datepicker';
import {MatDialog} from '@angular/material';
import {AuthService} from '../services/auth.service';
import {DataService} from '../services/data.service';
import {m} from '@angular/core/src/render3';

let dateToDisplay: any;
let speedLimit = 60.000;
let displayData = 'false';
let SpeedTimes = -1;
let vehicleNum: any;
let selectLatitude: any;
let selelctLongitude: any;
let speedDownIndex: number;
let speedUpIndex: number;

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
    protected vehicleNumber: String;
    protected interval: any;
    protected vehicleReport: any;
    protected overSpeedData: any;
    protected reports: any;
    protected stopDetails = [];
    protected confirmDisplayData: any;
    protected confirmDateToDisplay: any;
    protected confirmSpeedLimit: Number;
    protected confirmVehicleNumber: any;
    protected speedTimes: number;
    protected confirmToDisplaySpeedDetails = 'false';
    protected speedResult = [];

  constructor(public dialog: MatDialog,
              protected data: DataService) { }

  ngOnInit() {

      this.confirmDisplayData = displayData;

      this.interval = setInterval(() => {

          this.confirmDisplayData = displayData;

          if (displayData !== 'false') {
              this.confirmDisplayData = displayData;
              this.confirmDateToDisplay = dateToDisplay;
              this.confirmSpeedLimit = speedLimit;
              this.confirmVehicleNumber = vehicleNum;


              this.data.currentMessage3.source.subscribe(translatedValue => {
                  this.vehicleReport = translatedValue.history;
                  this.overSpeedData = this.vehicleReport.overSpeedData;
                  this.speedTimes = this.overSpeedData.speedingTime;
                  this.reports = this.vehicleReport.reports;
                  this.stopDetails =  this.vehicleReport.stopDetails;
                  if (SpeedTimes >= 0) {
                      this.speedTimes = SpeedTimes;
                      if (SpeedTimes > 0) {
                          this.confirmToDisplaySpeedDetails = 'OK';
                          this.data.currentMessage6.source.subscribe(speedResult => {
                              this.speedResult = speedResult;
                          });
                      } else {
                          this.confirmToDisplaySpeedDetails = 'false';
                      }
                  }
              });
          }

      }, 1000);
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

    requestStoppedLocation(longitude, latitude) {
      selelctLongitude = longitude;
      selectLatitude = latitude;

        const dialogRef = this.dialog.open(StoppedLocationPopupComponent, {
            height: '400px',
            width: '600px',
        }, );

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    requestSpeededLocation(downIndex, upIndex) {
        speedDownIndex = downIndex;
        speedUpIndex = upIndex;
        const dialogRef = this.dialog.open(SpeedLocationPopupComponent, {
            height: '400px',
            width: '600px',
        }, );

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
}


    requestSpeedDetails() {
        const dialogRef = this.dialog.open(SpeedPopupComponent, {
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
export class VehicleReportPopupComponent implements OnInit {

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
        let month: any;
        if (date.getMonth() + 1 < 10) {
          month = '0' + (date.getMonth() + 1);
        } else {
            month = date.getMonth() + 1;
        }
        const year = date.getFullYear();
        const day = date.getDate();
        this.selectDate = year + '-' + month + '-' + day;
        dateToDisplay = this.selectDate;
        vehicleNum = this.vehicleNumber;

        this.vehicles.requestReport(this.vehicleNumber, this.selectDate).subscribe(res => {

            if (res.success) {
                SpeedTimes = -1;
                speedLimit = 60.000;
                displayData = 'OK';
                this.auth.displayMessage(res, 'success', 'top');
                this.data.changeMessage3(res);
            } else {
                displayData = 'false';
                this.auth.displayMessage(res, 'danger', 'top');
            }
        });
    }
}



@Component({
    selector: 'stopped-location-popup',
    templateUrl: 'stopped-location-popup.html'
})
export class StoppedLocationPopupComponent implements OnInit {

    protected longitude: any;
    protected latitude: any;
    protected vehicleNumber: string;
    protected dateSelected: string;


    constructor() { };


    ngOnInit() {
        this.longitude = selelctLongitude;
        this.latitude = selectLatitude;
        this.vehicleNumber = vehicleNum;
        this.dateSelected = dateToDisplay;

    }
}


@Component({

    selector: 'speed-popup',
    templateUrl: 'speed-popup.html'
})
export class SpeedPopupComponent implements OnInit {

    protected allVehiclesResult: any;
    protected vehicleNumber: string;
    protected selectDate: string;
    protected selectSpeed: number;

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

    requestSpeedDetails() {
        const speedDetails = {
            date: dateToDisplay,
            vehicleNumber: vehicleNum,
            speed: this.selectSpeed
        };
        this.vehicles.requestSpeedDetail(speedDetails).subscribe(res => {
            speedLimit = this.selectSpeed;

            if (res.success) {
                SpeedTimes = res.amount;
                this.data.changeMessage6(res.overSpeedData);
                this.auth.displayMessage(res, 'success', 'top');
            } else {
                this.auth.displayMessage(res, 'danger', 'top');
            }

        });
    }
}


@Component({

    selector: 'speed-location-popup',
    templateUrl: 'speed-location-popup.html'
})
export class SpeedLocationPopupComponent implements OnInit {

    protected polylines = [];
    protected vehicleNumber: string;
    protected dateSelected: string;


    constructor(public vehicles: VehicleServiceService) { };


    ngOnInit() {
        this.vehicleNumber = vehicleNum;
        this.dateSelected = dateToDisplay;
        this.requestSpeedPath();
    }

    requestSpeedPath() {
        const speedInfo = {
            vehicleNumber: vehicleNum,
            date: dateToDisplay,
            speedUpIndex: speedUpIndex,
            speedDownIndex: speedDownIndex
        };
        this.vehicles.getSpeedPath(speedInfo).subscribe(res => {
            console.log(res);
            this.polylines[0] = res;
        });
    }
}
