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

let uId;
let userfullName;
let currentUserName;
let vehi;
var activate = false;
declare var $: any;
var vNumber;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  vehiclesNgrx: Observable<Vehicle[]>;
  vehicleMessage:any;
  userMessage:any;
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
  message: false;
  change: any;
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

      chart.on('draw', function(data) {
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
    }
  startAnimationForBarChart(chart) {
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
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

  deleteVehicleConfirmDialog(vehicleNumber){
    const dialogRef = this.dialog.open(DeleteVehiclePopup,{
      height: '350px',
      width: '400px',
    });
    vNumber=vehicleNumber;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      //console.log( vId);
    });
  };

  updateDialog(vehicle) {
    vehi = vehicle;
    const dialogRef = this.dialog.open(UpdateVehiclePopup, {
      height: '400px',
      width: '600px',
    }, );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit() {
    this.isAdmin = this.auth.findUser();
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

      this.data.currentMessage.subscribe(message=>this.userMessage=message);
      if(this.userMessage){
        this.showUser();
        this.data.changeMessage(null);      }

    }, 1000);

  }

  showVehicle(){
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
    private auth: AuthService
  ) { };
  deleteUser() {
    this.delUser.deleteUser(uId).subscribe(res => {
        if (res.success) {
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
    restUser: string;
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
    console.log(vehicleDetails);
    this.updVehicles.updateVehicle(this.id, vehicleDetails).subscribe(res => {
      if (res.success) {
          // this.data.changeMessage(true);
          this.data.changeMessage2(vehicleDetails);
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
    private delVehicles:VehicleServiceService,
  ) { };
  deleteVehicle(){
    this.delVehicles.deleteVehicle(vNumber).subscribe(res=>{
      if(res.success){
        //const type = ['success'];
        //const color = Math.floor((Math.random() * 4) + 1);
        $.notify({
          icon: "done_outline",
          message: "Vehicle <b> deleted</b> "

      },{
          type: 'danger',
          timer: 4000,
          placement: {
              from: "top",
              align: "center"
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">check_circle</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
      }
      else{
        //const type = ['success'];
        //const color = Math.floor((Math.random() * 4) + 1);
        $.notify({
          icon: "done_outline",
          message: "Somthing went <b> wrong</b> "

      },{
          type: 'danger',
          timer: 4000,
          placement: {
              from: "top",
              align: "center"
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">error</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });

      };
    });
  }
}
