import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { UserService } from '../services/user.service';
import { VehicleServiceService } from '../services/vehicle-service.service';
import {MatDialog} from '@angular/material';
import {AuthService} from '../services/auth.service';
import {DataService} from '../services/data.service';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store'; 
import { Vehicle } from '../models/table.model';
import { AppState } from '../app.state';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

let uId;
let userfullName;
let currentUserName;
let vehi;
declare var $: any;
var vNumber;
var index;
var userDetails: any;

import * as _moment from 'moment';

// tslint:disable-next-line:no-duplicate-imports

import {default as _rollupMoment, Moment} from 'moment/src/moment';
import {FormControl} from '@angular/forms';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
    parse: {
        dateInput: 'MM/YYYY',
    },
    display: {
        dateInput: 'MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        // dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    vehiclesNgrx: Observable<Vehicle[]>;
    userMessage: false;
    interval: any;
    allUsers: any[];
    allVehicles: any[];
    vehicleNumber: String;
    imeiNumber: String;
    vehicleDetails: String;
    isAdmin: any;
    columnNum: number;
    cardNum: number;
    userVal: number;
    vehicleVal: number;
    change: any;
    summaryVehicle: any;

    constructor(
        private getUsers: UserService,
        private getVehicles: VehicleServiceService,
        public dialog: MatDialog,
        private auth: AuthService,
        private data: DataService,
        private store: Store<AppState>
    ) {
        this.vehiclesNgrx = store.select('vehicle');
    };


    startAnimationForLineChart(chart) {
        let seq: any, delays: any, durations: any;
        seq = 0;
        delays = 80;
        durations = 500;

        chart.on('draw', function (data) {
            if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 600,
                        dur: 700,
                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            } else if (data.type === 'point') {
                seq++;
                data.element.animate({
                    opacity: {
                        begin: seq * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq = 0;
    };

    restClick(userId: any, name: string, userName: string) {
        const dialogRef = this.dialog.open(RestPasswordPopup, {
            height: '350px',
            width: '400px',
        });
        userfullName = name;
        uId = userId;
        currentUserName = userName;
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    };

    editUser(user: any) {
        const dialogRef = this.dialog.open(EditUserPopup, {
            height: '400pxpx',
            width: '600px',
        });
        userDetails = user;
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    };

    logsClick(userId: any, name: string, userName: string) {
        const dialogRef = this.dialog.open(UserLogsPopup, {
            height: '600px',
            width: '600px',
        });
        userfullName = name;
        uId = userId;
        currentUserName = userName;
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    startAnimationForBarChart(chart) {
        let seq2: any, delays2: any, durations2: any;

        seq2 = 0;
        delays2 = 80;
        durations2 = 500;
        chart.on('draw', function (data) {
            if (data.type === 'bar') {
                seq2++;
                data.element.animate({
                    opacity: {
                        begin: seq2 * delays2,
                        dur: durations2,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq2 = 0;
    };

    deleteConfirmDialog(userId, name) {
        const dialogRef = this.dialog.open(DeleteUserPopup, {
            height: '350px',
            width: '400px',
        });
        uId = userId;
        userfullName = name;
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    };

    deleteVehicleConfirmDialog(vehicleNumber, ind) {
        const dialogRef = this.dialog.open(DeleteVehiclePopup, {
            height: '350px',
            width: '400px',
        });
        vNumber = vehicleNumber;
        index = ind;
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            // console.log( index);
        });
    };

    updateDialog(vehicle) {
        vehi = vehicle;
        const dialogRef = this.dialog.open(UpdateVehiclePopup, {
            height: '400px',
            width: '600px',
        },);

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    requestSummary() {
        const dialogRef = this.dialog.open(VehicleSummaryPopup, {
            height: '400px',
            width: '600px',
        },);

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }


    requestReport() {
        const dialogRef = this.dialog.open(VehicleReportPopup, {
            height: '400px',
            width: '600px',
        },);

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    ngOnInit() {
        this.isAdmin = this.auth.findUser();
        this.data.changeMessage2(false);
        if (this.isAdmin) {
            this.columnNum = 6;
            this.cardNum = 3;
        } else {
            this.columnNum = 12;
            this.cardNum = 4;
        }
        this.showUser();
        this.showVehicle();

        // for refreshing tables
        this.interval = setInterval(() => {
            // this.data.currentMessage2.subscribe(message=>this.vehicleMessage=message);
            // if(this.vehicleMessage){
            //   this.showVehicle();
            //   this.data.changeMessage2(null);
            // };
            if (this.data.currentMessage2) {
                this.data.currentMessage2.source.subscribe(translatedValue => {
                    this.summaryVehicle = translatedValue.userRes;
                });

            }
            this.data.currentMessage.subscribe(message => this.userMessage = message);
            if (this.userMessage) {
                this.showVehicle();
                this.showUser();
                this.data.changeMessage(false);
            }

        }, 1000);


        const dataDailySalesChart: any = {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
                [12, 17, 7, 17, 23, 18, 38]
            ]
        };

        const optionsDailySalesChart: any = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {top: 0, right: 0, bottom: 0, left: 0},
        }

        const dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);
        const dailySalesChart2 = new Chartist.Line('#dailySalesChart2', dataDailySalesChart, optionsDailySalesChart);

        this.startAnimationForLineChart(dailySalesChart);
    }
    showVehicle() {
    this.getVehicles.getAllVehicles().subscribe(result => {
      this.allVehicles = result.vehicle;
      this.vehicleVal = result.vehicle.length;
    });
  }
  showUser() {
    this.getUsers.getAllUsers().subscribe(result => {
      this.allUsers = result;
      this.userVal = result.length;
    });
  }

}

@Component({
  selector: 'delete-user-popup',
  templateUrl: 'delete-user-popup.html',
})
export class DeleteUserPopup {
    public username: string;

    ngOnInit() {
        this.username = userfullName;
    }
  constructor(
    private delUser: UserService,
    private auth: AuthService,
    private data: DataService
  ) { };
  deleteUser() {
    this.delUser.deleteUser(uId).subscribe(res => {
        if (res.success) {
            this.data.changeMessage(true);
            this.auth.displayMessage(res, 'success', 'top');
        } else {
            this.auth.displayMessage(res, 'danger', 'top');
        }
    });
  }
}


@Component({
    selector: 'rest-password-popup',
    templateUrl: 'rest-password-popup.html',
})
export class RestPasswordPopup {
    public username: string;
    constructor(
        private user: UserService,
        private auth: AuthService
    ) { };
    ngOnInit() {
      this.username = userfullName;
    }
    restPassword() {
        const userRestPasswordDetails = {
          userId : uId,
          userName : currentUserName
        };
        this.user.restPassword(userRestPasswordDetails).subscribe(res => {
            if (res.success) {
                this.auth.displayMessage(res, 'success', 'top');
            } else {
                this.auth.displayMessage(res, 'danger', 'top');
            }
        });
    }
}



@Component({
    selector: 'vehicle-summary-popup',
    templateUrl: 'vehicle-summary-popup.html',
    providers: [
        // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
        // application's root module. We provide it at the component level here, due to limitations of
        // our example generation script.useClass
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class VehicleSummaryPopup {

    protected date = new FormControl(moment());
    protected selectDate: any;

    constructor(
        public vehicles: VehicleServiceService,
        private auth: AuthService,
        private data: DataService
    ) { };

    requestSummary() {
        const date = this.selectDate._i.year + '-' + this.selectDate._i.month + 1;
        this.vehicles.requestSummary(date).subscribe(res => {
            if (res.success) {
                this.auth.displayMessage(res, 'success', 'top');
                this.data.changeMessage2(res);
            } else {
                this.auth.displayMessage(res, 'danger', 'top');
            }
        });
    }

    chosenYearHandler(normalizedYear: Moment) {
        const ctrlValue = this.date.value;
        ctrlValue.year(normalizedYear.year());
        this.date.setValue(ctrlValue);
    }

    chosenMonthHandler(normlizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
        const ctrlValue = this.date.value;
        ctrlValue.month(normlizedMonth.month());
        this.date.setValue(ctrlValue);
        datepicker.close();
    }
}



@Component({
    selector: 'vehicle-report-popup',
    templateUrl: 'vehicle-report-popup.html'
})
export class VehicleReportPopup {

    protected allVehiclesResult: any;
    protected vehicleNumber: string;
    protected selectDate: string;


    ngOnInit() {
        this.vehicles.getVehicleList().subscribe(result => {
            this.getUserVehicles(result);
        });
    }

    getUserVehicles(result) {
        this.allVehiclesResult = result;
    }



    constructor(
        private auth: AuthService,
        private data: DataService,
        public vehicles: VehicleServiceService
    ) { };

    requestReport() {}
}


@Component({
    selector: 'edit-user-popup',
    templateUrl: 'edit-user-popup.html',
})
export class EditUserPopup {
    private userDetails: any;
    protected  fullName: string;
    protected userName: string;
    protected role: string;
    protected address: string;
    protected email: string;
    protected status: string;
    protected contactNumber: string;
    protected userRoles = ['Admin', 'User'];
    protected userStatus = ['Active', 'Deleted'];
    constructor(
        private user: UserService,
        private auth: AuthService,
        private data: DataService
    ) { };
    ngOnInit() {
        this.userDetails = userDetails;
        console.log(this.userDetails);
        this.fullName = this.userDetails.fullName;
        this.userName = this.userDetails.userName;
        this.role = this.userDetails.roles;
        this.email = this.userDetails.emailAddress;
        this.address = this.userDetails.address;
        this.contactNumber = this.userDetails.contactNumber;
        this.status = this.userDetails.status;
    }
    updateUser() {
        const userUpdateDetails = {
            fullName :  this.fullName,
            userName : this.userName,
            roles : this.role,
            address : this.address,
            emailAddress : this.email,
            contactNumber: this.contactNumber,
            status: this.status,
            userId: this.userDetails._id
        };
        this.user.editUser(userUpdateDetails).subscribe(res => {
            if (res.success) {
                this.data.changeMessage(true);
                this.auth.displayMessage(res, 'success', 'top');
            } else {
                this.auth.displayMessage(res, 'danger', 'top');
            }
        });
    }
}


@Component({
    selector: 'user-logs-popup',
    templateUrl: 'user-logs-popup.html',
})
export class UserLogsPopup {
    public username: string;
    private userId: any;
    private userLogs: any;
    constructor(
        private user: UserService,
        private auth: AuthService
    ) { };
    ngOnInit() {
        this.username = userfullName;
        this.userId = uId;
        this.getUserLogs();
    }
    getUserLogs() {
        this.user.getUserLogs(this.userId).subscribe(res => {
            if (res.success) {
                this.userLogs = res.logDetails[0].logDetails;
            } else {
                this.auth.displayMessage(res, 'danger', 'top');
            }
        });
    }
}

@Component({
  selector: 'update-vehicle-popup',
  templateUrl: 'update-vehicle-popup.html',
})
export class UpdateVehiclePopup {
  id = vehi._id;
  vehicleNo = vehi.vehicleNumber;
  deviceImei = vehi.imeiNumber;
  userName = vehi.userName;
  vehicleDetails = vehi.vehicleDetails;
  constructor(
    private updVehicles: VehicleServiceService,
    private auth: AuthService,
    private data: DataService
  ) { };
  updateVehicle() {
    const vehicleDetails = {
      vehicleNo: this.vehicleNo,
        Imie: this.deviceImei,
        userName: this.userName,
        details: this.vehicleDetails
    };
    this.updVehicles.updateVehicle(this.id, vehicleDetails).subscribe(res => {
      if (res.success) {
          // this.data.changeMessage(true);
          this.data.changeMessage(true);
          this.auth.displayMessage(res, 'success', 'top');
      } else {
          console.log(res.err);
          this.auth.displayMessage(res, 'danger', 'top');
      }
    });
  }
}

@Component({
  selector: 'delete-vehicle-popup',
  templateUrl: 'delete-vehicle-popup.html',
})
export class DeleteVehiclePopup {
  constructor(
    private delVehicles: VehicleServiceService,
    private data: DataService,
    private auth: AuthService
    // private store: Store<AppState>
  ) { };
  deleteVehicle() {
    this.delVehicles.deleteVehicle(vNumber).subscribe(res => {
      if (res.success) {
        // this.store.dispatch(new VehicleActions.RemoveVehicle(index) )
          this.data.changeMessage(true);
          this.auth.displayMessage(res, 'success', 'top');
      } else {
          this.auth.displayMessage(res, 'danger', 'top');
      }
    });
  }
}

